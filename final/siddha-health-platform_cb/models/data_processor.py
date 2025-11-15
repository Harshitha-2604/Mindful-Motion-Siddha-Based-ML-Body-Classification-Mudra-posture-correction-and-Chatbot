"""
MODEL: Data Processor
Handles dataset processing and CSV operations
"""
import os
import pandas as pd
from tqdm import tqdm


class DataProcessor:
    def __init__(self):
        self.dataset_stats = {
            'mudra_stats': {},
            'overall_stats': {
                'both_hands': 0,
                'single_hand_duplicated': 0,
                'no_hands_detected': 0,
                'failed_to_load': 0,
                'unknown_error': 0
            }
        }
    
    def process_dataset(self, dataset_dir, feature_extractor):
        rows = []
        
        for label in sorted(os.listdir(dataset_dir)):
            label_path = os.path.join(dataset_dir, label)
            if not os.path.isdir(label_path):
                continue
            
            self.dataset_stats['mudra_stats'][label] = {
                'total': 0, 'both_hands': 0, 'single_hand_duplicated': 0,
                'no_hands_detected': 0, 'failed_to_load': 0, 'unknown_error': 0
            }
            
            print(f"\nProcessing {label}...")
            
            for filename in tqdm(sorted(os.listdir(label_path)), desc=label):
                if not filename.lower().endswith(('.jpg', '.jpeg', '.png')):
                    continue
                
                self.dataset_stats['mudra_stats'][label]['total'] += 1
                path = os.path.join(label_path, filename)
                coords, status = feature_extractor.extract_from_image(path)
                
                self.dataset_stats['mudra_stats'][label][status] += 1
                self.dataset_stats['overall_stats'][status] += 1
                
                if coords:
                    rows.append([os.path.join(label, filename), label] + coords)
        
        return rows, self.dataset_stats
    
    def save_to_csv(self, rows, output_path='mudra_features.csv'):
        cols = ["filename", "label"]
        
        for i in range(1, 22):
            cols.extend([f"x{i}_h1", f"y{i}_h1", f"z{i}_h1"])
        
        for i in range(1, 22):
            cols.extend([f"x{i}_h2", f"y{i}_h2", f"z{i}_h2"])
        
        df = pd.DataFrame(rows, columns=cols)
        df.to_csv(output_path, index=False)
        return df
    
    def load_from_csv(self, csv_path='mudra_features.csv'):
        return pd.read_csv(csv_path)