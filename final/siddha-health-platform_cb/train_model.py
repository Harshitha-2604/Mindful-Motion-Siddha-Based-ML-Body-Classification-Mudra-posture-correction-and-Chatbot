import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.metrics import classification_report, accuracy_score
from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

# Create model directory if it doesn't exist
os.makedirs('model', exist_ok=True)

# Load dataset (update this path to your dataset location)
dataset_path = 'data/balanced_dataset.csv'
df = pd.read_csv(dataset_path)

# Check for NaN values
print(f"Total NaN values in dataset: {df.isna().sum().sum()}")
print("NaN values by column:")
print(df.isna().sum())

# Clean column names
df.columns = df.columns.str.replace(' ', '_')

# Clean categorical values (using a safer approach)
for col in df.select_dtypes(include=['object']).columns:
    df[col] = df[col].astype(str).str.strip().str.replace(' ', '_')

# Drop rows with NaN values in the target column
if df['bodytype'].isna().any():
    print(f"Dropping {df['bodytype'].isna().sum()} rows with missing bodytype values")
    df = df.dropna(subset=['bodytype'])

# Class Mapping
class_mapping = {
    'kapha': 0,
    'pitta': 1,
    'pitta-kapha': 2,
    'vata': 3,  # Note: correct spelling from 'vatta' to 'vata'
    'vata-kapha': 4,
    'vata-pitta': 5
}

# Convert bodytype to the mapped values, handling any unexpected values
df['bodytype'] = df['bodytype'].apply(lambda x: class_mapping.get(x.lower(), np.nan) if isinstance(x, str) else np.nan)

# Drop any rows that might still have NaN in bodytype after mapping
df = df.dropna(subset=['bodytype'])

# Convert bodytype to int (important for classification)
df['bodytype'] = df['bodytype'].astype(int)

print(f"Dataset shape after cleaning: {df.shape}")

# Split features and target
X = df.drop(columns=['bodytype'])
y = df['bodytype']

# Check for any remaining NaN values
print(f"NaN values in X: {X.isna().sum().sum()}")
print(f"NaN values in y: {y.isna().sum()}")

# Handle any remaining NaN values in features
# For numeric columns, fill NaN with median
for col in X.select_dtypes(include=['float64', 'int64']).columns:
    X[col] = X[col].fillna(X[col].median())

# For categorical columns, fill NaN with most frequent value
for col in X.select_dtypes(include=['object']).columns:
    X[col] = X[col].fillna(X[col].mode()[0])

# Verify no more NaN values
print(f"NaN values in X after cleaning: {X.isna().sum().sum()}")

# Split Train-Test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, 
                                                    stratify=y, random_state=42)

# One-Hot Encode categorical columns
categorical_cols = X.select_dtypes(include=['object']).columns
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
    ],
    remainder='passthrough'
)

# Scale & Preprocess
scaler = StandardScaler()

# Build Pipeline
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('scaler', scaler),
    ('classifier', MLPClassifier(
        hidden_layer_sizes=(150, 100, 50),
        activation='relu',
        solver='adam',
        alpha=0.001,
        learning_rate='adaptive',
        max_iter=500,
        random_state=42
    ))
])

# Train the model
print("Training the model...")
pipeline.fit(X_train, y_train)

# Evaluate
y_pred = pipeline.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"\nMLP Classifier Accuracy: {accuracy:.4f}")
print("\nDetailed Classification Report:\n", classification_report(y_test, y_pred))

# Save the model
model_path = 'model/siddha_mlp_model.pkl'
with open(model_path, 'wb') as f:
    pickle.dump(pipeline, f)
print(f"Model saved to {model_path}")