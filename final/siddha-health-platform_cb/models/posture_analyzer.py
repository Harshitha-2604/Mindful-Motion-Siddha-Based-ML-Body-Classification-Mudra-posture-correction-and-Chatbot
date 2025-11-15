import numpy as np


class PostureAnalyzer:
    def __init__(self):
        # Define ideal posture rules for each mudra
        self.mudra_rules = {
            'apana_mudra': {
                'thumb_middle_touch': {'min': 0.0, 'max': 0.08, 'weight': 3.0},
                'thumb_ring_touch': {'min': 0.0, 'max': 0.08, 'weight': 3.0},
                'index_extended': {'min': 0.15, 'max': 0.35, 'weight': 2.0},
                'pinky_extended': {'min': 0.15, 'max': 0.35, 'weight': 2.0},
            },
            'chin_mudra': {
                'thumb_index_touch': {'min': 0.0, 'max': 0.08, 'weight': 3.0},
                'middle_extended': {'min': 0.15, 'max': 0.35, 'weight': 2.0},
                'ring_extended': {'min': 0.15, 'max': 0.35, 'weight': 2.0},
                'pinky_extended': {'min': 0.15, 'max': 0.35, 'weight': 2.0},
            },
            'mann_mudra': {
                'thumb_ring_touch': {'min': 0.0, 'max': 0.08, 'weight': 3.0},
                'index_extended': {'min': 0.15, 'max': 0.35, 'weight': 2.0},
                'middle_extended': {'min': 0.15, 'max': 0.35, 'weight': 2.0},
                'pinky_extended': {'min': 0.15, 'max': 0.35, 'weight': 2.0},
            },
            'neer_mudra': {
                'thumb_pinky_touch': {'min': 0.0, 'max': 0.08, 'weight': 3.0},
                'index_extended': {'min': 0.15, 'max': 0.35, 'weight': 2.0},
                'middle_extended': {'min': 0.15, 'max': 0.35, 'weight': 2.0},
                'ring_extended': {'min': 0.15, 'max': 0.35, 'weight': 2.0},
            },
            'prana_mudra': {
                'thumb_ring_touch': {'min': 0.0, 'max': 0.08, 'weight': 3.0},
                'thumb_pinky_touch': {'min': 0.0, 'max': 0.08, 'weight': 3.0},
                'index_extended': {'min': 0.15, 'max': 0.35, 'weight': 2.0},
                'middle_extended': {'min': 0.15, 'max': 0.35, 'weight': 2.0},
            },
        }
        
        self.feedback_messages = {
            'thumb_index_touch': {
                'correct': 'Thumb-Index touch: Perfect! ✓',
                'too_far': 'Bring thumb and index finger closer together',
                'too_close': 'Slightly separate thumb and index finger'
            },
            'thumb_middle_touch': {
                'correct': 'Thumb-Middle touch: Perfect! ✓',
                'too_far': 'Bring thumb and middle finger closer',
                'too_close': 'Adjust thumb-middle finger position'
            },
            'thumb_ring_touch': {
                'correct': 'Thumb-Ring touch: Perfect! ✓',
                'too_far': 'Bring thumb and ring finger closer',
                'too_close': 'Adjust thumb-ring finger position'
            },
            'thumb_pinky_touch': {
                'correct': 'Thumb-Pinky touch: Perfect! ✓',
                'too_far': 'Bring thumb and pinky finger closer',
                'too_close': 'Adjust thumb-pinky finger position'
            },
            'index_extended': {
                'correct': 'Index finger: Perfect extension! ✓',
                'too_bent': 'Extend index finger more',
                'too_extended': 'Relax index finger slightly'
            },
            'middle_extended': {
                'correct': 'Middle finger: Perfect extension! ✓',
                'too_bent': 'Extend middle finger more',
                'too_extended': 'Relax middle finger slightly'
            },
            'ring_extended': {
                'correct': 'Ring finger: Perfect extension! ✓',
                'too_bent': 'Extend ring finger more',
                'too_extended': 'Relax ring finger slightly'
            },
            'pinky_extended': {
                'correct': 'Pinky finger: Perfect extension! ✓',
                'too_bent': 'Extend pinky finger more',
                'too_extended': 'Relax pinky finger slightly'
            },
        }
    
    def calculate_finger_distances(self, coords):
        """Calculate distances between finger tips for both hands"""
        if len(coords) != 126:
            return None
        
        coords_array = np.array(coords).reshape(2, 21, 3)
        
        distances = {
            'left_hand': {},
            'right_hand': {}
        }
        
        hand_names = ['left_hand', 'right_hand']
        
        for hand_idx in range(2):
            hand = coords_array[hand_idx]
            hand_name = hand_names[hand_idx]
            
            # Finger tips: thumb=4, index=8, middle=12, ring=16, pinky=20
            # Palm center: 0
            thumb_tip = hand[4]
            index_tip = hand[8]
            middle_tip = hand[12]
            ring_tip = hand[16]
            pinky_tip = hand[20]
            palm_center = hand[0]
            
            # Calculate key distances
            distances[hand_name]['thumb_index'] = np.linalg.norm(thumb_tip - index_tip)
            distances[hand_name]['thumb_middle'] = np.linalg.norm(thumb_tip - middle_tip)
            distances[hand_name]['thumb_ring'] = np.linalg.norm(thumb_tip - ring_tip)
            distances[hand_name]['thumb_pinky'] = np.linalg.norm(thumb_tip - pinky_tip)
            
            # Calculate finger extensions (distance from palm to tip)
            distances[hand_name]['index_extension'] = np.linalg.norm(palm_center - index_tip)
            distances[hand_name]['middle_extension'] = np.linalg.norm(palm_center - middle_tip)
            distances[hand_name]['ring_extension'] = np.linalg.norm(palm_center - ring_tip)
            distances[hand_name]['pinky_extension'] = np.linalg.norm(palm_center - pinky_tip)
        
        return distances
    
    def analyze_posture(self, coords, mudra_name):
        """Analyze posture and provide feedback"""
        if mudra_name == "Unknown Mudra" or mudra_name not in self.mudra_rules:
            return None, []
        
        distances = self.calculate_finger_distances(coords)
        if distances is None:
            return None, []
        
        rules = self.mudra_rules[mudra_name]
        feedback = []
        total_score = 0
        max_score = 0
        
        # Analyze both hands (usually they should be symmetrical)
        for hand_name in ['left_hand', 'right_hand']:
            hand_distances = distances[hand_name]
            
            for rule_name, rule_params in rules.items():
                max_score += rule_params['weight']
                
                # Map rule names to distance keys
                if 'touch' in rule_name:
                    if 'thumb_index' in rule_name:
                        actual_distance = hand_distances['thumb_index']
                    elif 'thumb_middle' in rule_name:
                        actual_distance = hand_distances['thumb_middle']
                    elif 'thumb_ring' in rule_name:
                        actual_distance = hand_distances['thumb_ring']
                    elif 'thumb_pinky' in rule_name:
                        actual_distance = hand_distances['thumb_pinky']
                    else:
                        continue
                    
                    # Check if fingers are touching correctly
                    if rule_params['min'] <= actual_distance <= rule_params['max']:
                        total_score += rule_params['weight']
                        if hand_name == 'right_hand':  # Only show feedback once
                            feedback.append((self.feedback_messages[rule_name]['correct'], 'correct'))
                    elif actual_distance > rule_params['max']:
                        if hand_name == 'right_hand':
                            feedback.append((self.feedback_messages[rule_name]['too_far'], 'error'))
                    else:
                        if hand_name == 'right_hand':
                            feedback.append((self.feedback_messages[rule_name]['too_close'], 'warning'))
                
                elif 'extended' in rule_name:
                    if 'index' in rule_name:
                        actual_distance = hand_distances['index_extension']
                    elif 'middle' in rule_name:
                        actual_distance = hand_distances['middle_extension']
                    elif 'ring' in rule_name:
                        actual_distance = hand_distances['ring_extension']
                    elif 'pinky' in rule_name:
                        actual_distance = hand_distances['pinky_extension']
                    else:
                        continue
                    
                    # Check if finger is extended correctly
                    if rule_params['min'] <= actual_distance <= rule_params['max']:
                        total_score += rule_params['weight']
                        if hand_name == 'right_hand':
                            feedback.append((self.feedback_messages[rule_name]['correct'], 'correct'))
                    elif actual_distance < rule_params['min']:
                        if hand_name == 'right_hand':
                            feedback.append((self.feedback_messages[rule_name]['too_bent'], 'error'))
                    else:
                        if hand_name == 'right_hand':
                            feedback.append((self.feedback_messages[rule_name]['too_extended'], 'warning'))
        
        # Calculate accuracy percentage
        accuracy = (total_score / max_score * 100) if max_score > 0 else 0
        
        return accuracy, feedback