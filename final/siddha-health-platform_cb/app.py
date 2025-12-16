

import os
import cv2
import pickle
import base64
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- MUDRA DETECTION IMPORTS ---
# This imports from the 'models' folder you just copied.
from models.feature_extractor import FeatureExtractor, GeometricFeatureCalculator
from models.mudra_classifier import MudraClassifier
from models.posture_analyzer import PostureAnalyzer

app = Flask(__name__)
CORS(app)  # Allow communication from the frontend

# ===================================================================
# PART 1: LOAD BODY TYPE PREDICTION MODEL (Existing Logic)
# ===================================================================
model_path = 'model/siddha_mlp_model.pkl'
if not os.path.exists(model_path):
    print(f"ERROR: Body type model file not found at {model_path}.")
    pipeline = None
else:
    with open(model_path, 'rb') as f:
        pipeline = pickle.load(f)
    print("✅ Body type prediction model loaded successfully!")

class_mapping_reverse = {
    0: 'kapha', 1: 'pitta', 2: 'pitta-kapha', 3: 'vata',
    4: 'vata-kapha', 5: 'vata-pitta'
}

# ===================================================================
# PART 2: LOAD MUDRA DETECTION MODEL (Your New Logic)
# ===================================================================
print("🤖 Loading Mudra Detection models and components...")
feature_extractor = FeatureExtractor()
classifier = MudraClassifier()
posture_analyzer = PostureAnalyzer()

# Load the trained mudra model files from the 'saved_models/' folder
if not classifier.load('saved_models/svm_mudra_model.pkl', 'saved_models/feature_scaler.pkl', 'saved_models/mudra_labels.pkl'):
    print("❌ CRITICAL: Mudra model files not found in 'saved_models/' folder. The mudra endpoint will not work.")
    classifier = None  # Disable classifier if models are not found
else:
    feature_extractor.initialize(static_image_mode=False, max_num_hands=2)
    print("✅ Mudra detection model loaded successfully!")


# ===================================================================
# API ENDPOINTS
# ===================================================================

# --- Endpoint for Body Type Prediction ---
@app.route('/api/predict', methods=['POST'])
def predict():
    if not pipeline:
        return jsonify({'error': 'Body type model is not loaded'}), 500
    try:
        data = request.json
        column_mapping = {
            'weight': 'weight', 'walking': 'walking_pace', 'speech': 'speech_pattern',
            'weather': 'weather_preference', 'sweat': 'sweating_pattern', 'hunger': 'hunger_pattern',
            'skin_type': 'skin_texture', 'hair_type': 'hair_type', 'lips': 'lips_description',
            'teeth': 'teeth_description', 'eyes': 'eyes_description', 'memory': 'memory_description',
            'thinking': 'thinking_style', 'action_efficiency': 'action_efficiency', 'sleep': 'sleep_pattern',
            'skin_color': 'skin_tone', 'nails': 'nails_description'
        }
        input_data = {model_column: [data.get(frontend_id)] for frontend_id, model_column in column_mapping.items()}
        input_df = pd.DataFrame(input_data)
        
        prediction = pipeline.predict(input_df)[0]
        body_type = class_mapping_reverse[prediction]
        
        return jsonify({'body_type': body_type})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Endpoint for Mudra Detection (YOUR NEW CODE) ---
@app.route('/api/detect_mudra', methods=['POST'])
def detect_mudra():
    if not classifier:
        return jsonify({'error': 'Mudra detection model is not loaded'}), 500
    try:
        data = request.get_json()
        if 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400

        # Decode the base64 image sent from the frontend
        image_data = base64.b64decode(data['image'].split(',')[1])
        nparr = np.frombuffer(image_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Use your existing model logic
        prediction = "Unknown Mudra"
        confidence = 0.0
        posture_accuracy = None
        posture_feedback = []

        coords, status = feature_extractor.extract_from_frame(frame)

        if coords:
            features = GeometricFeatureCalculator.calculate(coords)
            if features:
                prediction, confidence = classifier.predict_with_smoothing(features, 0.80)
                if prediction != "Unknown Mudra":
                    posture_accuracy, posture_feedback = posture_analyzer.analyze_posture(coords, prediction)

        return jsonify({
            'mudra_name': prediction,
            'confidence': round(confidence * 100, 2),
            'posture_accuracy': round(posture_accuracy, 2) if posture_accuracy is not None else None,
            'posture_feedback': posture_feedback
        })
    except Exception as e:
        print(f"Error in /api/detect_mudra: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
