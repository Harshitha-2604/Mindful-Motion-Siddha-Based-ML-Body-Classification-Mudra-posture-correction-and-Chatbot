"""
MODEL: Feature Extractor
Extracts hand landmarks from images using MediaPipe
"""
import cv2
import mediapipe as mp
import numpy as np


class FeatureExtractor:
    def __init__(self, min_detection_confidence=0.1, min_tracking_confidence=0.1):
        self.mp_hands = mp.solutions.hands
        self.min_detection_confidence = min_detection_confidence
        self.min_tracking_confidence = min_tracking_confidence
        self.hands = None
    
    def initialize(self, static_image_mode=True, max_num_hands=2):
        self.hands = self.mp_hands.Hands(
            static_image_mode=static_image_mode,
            max_num_hands=max_num_hands,
            min_detection_confidence=self.min_detection_confidence,
            min_tracking_confidence=self.min_tracking_confidence
        )
    
    def close(self):
        if self.hands:
            self.hands.close()
    
    def extract_from_image(self, image_path):
        img = cv2.imread(image_path)
        if img is None:
            return None, "failed_to_load"
        return self.extract_from_frame(img)
    
    def extract_from_frame(self, frame):
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.hands.process(rgb_frame)
        
        if not results.multi_hand_landmarks:
            return None, "no_hands_detected"
        
        num_hands = len(results.multi_hand_landmarks)
        coords = []
        
        if num_hands >= 2:
            for hand_lm in results.multi_hand_landmarks[:2]:
                for landmark in hand_lm.landmark:
                    coords.extend([landmark.x, landmark.y, landmark.z])
            return coords, "both_hands"
        
        elif num_hands == 1:
            hand_coords = []
            for landmark in results.multi_hand_landmarks[0].landmark:
                hand_coords.extend([landmark.x, landmark.y, landmark.z])
            coords = hand_coords + hand_coords
            return coords, "single_hand_duplicated"
        
        return None, "unknown_error"
    
    def get_hand_landmarks_from_frame(self, frame):
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        return self.hands.process(rgb_frame)


class GeometricFeatureCalculator:
    @staticmethod
    def calculate(coords):
        if len(coords) != 126:
            return None
        
        try:
            coords_array = np.array(coords).reshape(2, 21, 3)
            features = []
            
            for hand_idx in range(2):
                hand = coords_array[hand_idx]
                
                thumb_tip = hand[4]
                index_tip = hand[8]
                middle_tip = hand[12]
                ring_tip = hand[16]
                pinky_tip = hand[20]
                palm_center = hand[0]
                
                features.extend([
                    np.linalg.norm(thumb_tip - index_tip),
                    np.linalg.norm(thumb_tip - middle_tip),
                    np.linalg.norm(thumb_tip - ring_tip),
                    np.linalg.norm(thumb_tip - pinky_tip),
                    np.linalg.norm(index_tip - middle_tip),
                    np.linalg.norm(middle_tip - ring_tip),
                    np.linalg.norm(ring_tip - pinky_tip),
                ])
                
                features.extend([
                    np.linalg.norm(palm_center - thumb_tip),
                    np.linalg.norm(palm_center - index_tip),
                    np.linalg.norm(palm_center - middle_tip),
                    np.linalg.norm(palm_center - ring_tip),
                    np.linalg.norm(palm_center - pinky_tip),
                ])
                
                for i in [1, 5, 9, 13, 17]:
                    if i + 3 < 21:
                        v1 = hand[i+1] - hand[i]
                        v2 = hand[i+3] - hand[i+2]
                        cos_angle = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2) + 1e-8)
                        cos_angle = np.clip(cos_angle, -1, 1)
                        angle = np.arccos(cos_angle)
                        features.append(angle)
            
            return features
        except Exception as e:
            print(f"Error calculating features: {e}")
            return None