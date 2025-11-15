"""
MODEL: Mudra Classifier
SVM-based classifier for mudra recognition
"""
import numpy as np
import joblib
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from collections import Counter


class MudraClassifier:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.mudra_labels = None
        self.best_kernel = None
        self.prediction_history = []
        self.history_size = 10
    
    def train(self, X_train, y_train, X_test, y_test, kernels=['linear', 'rbf', 'poly']):
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        best_accuracy = 0
        results = {}
        
        for kernel in kernels:
            svm_model = SVC(kernel=kernel, C=1.0, random_state=42, probability=True)
            svm_model.fit(X_train_scaled, y_train)
            y_pred = svm_model.predict(X_test_scaled)
            accuracy = accuracy_score(y_test, y_pred)
            
            results[kernel] = {
                'accuracy': accuracy,
                'model': svm_model,
                'predictions': y_pred
            }
            
            if accuracy > best_accuracy:
                best_accuracy = accuracy
                self.model = svm_model
                self.best_kernel = kernel
        
        self.mudra_labels = sorted(np.unique(y_train))
        return results
    
    def predict(self, features, threshold=0.65):
        if self.model is None:
            raise ValueError("Model not trained or loaded")
        
        features_scaled = self.scaler.transform([features])
        prediction = self.model.predict(features_scaled)[0]
        probabilities = self.model.predict_proba(features_scaled)[0]
        confidence = max(probabilities)
        
        if confidence < threshold:
            return "Unknown Mudra", confidence
        
        return prediction, confidence
    
    def predict_with_smoothing(self, features, threshold=0.65):
        prediction, confidence = self.predict(features, threshold)
        
        self.prediction_history.append((prediction, confidence))
        if len(self.prediction_history) > self.history_size:
            self.prediction_history.pop(0)
        
        if len(self.prediction_history) >= 3:
            recent = [pred for pred, conf in self.prediction_history[-5:] if conf > 0.6]
            if recent:
                most_common = Counter(recent).most_common(1)
                return most_common[0][0], confidence
        
        return prediction, confidence
    
    def evaluate(self, X_test, y_test):
        X_test_scaled = self.scaler.transform(X_test)
        y_pred = self.model.predict(X_test_scaled)
        
        return {
            'accuracy': accuracy_score(y_test, y_pred),
            'classification_report': classification_report(y_test, y_pred, output_dict=True),
            'confusion_matrix': confusion_matrix(y_test, y_pred),
            'predictions': y_pred
        }
    
    def save(self, model_path='saved_models/svm_mudra_model.pkl',
             scaler_path='saved_models/feature_scaler.pkl',
             labels_path='saved_models/mudra_labels.pkl'):
        joblib.dump(self.model, model_path)
        joblib.dump(self.scaler, scaler_path)
        joblib.dump(self.mudra_labels, labels_path)
    
    def load(self, model_path='saved_models/svm_mudra_model.pkl',
             scaler_path='saved_models/feature_scaler.pkl',
             labels_path='saved_models/mudra_labels.pkl'):
        try:
            self.model = joblib.load(model_path)
            self.scaler = joblib.load(scaler_path)
            self.mudra_labels = joblib.load(labels_path)
            return True
        except FileNotFoundError:
            return False