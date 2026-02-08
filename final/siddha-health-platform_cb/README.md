# Siddha Health Platform

A web application that combines ancient Siddha practices with modern technology to provide personalized health recommendations.

## Features

### Stage 1: Body Type Analysis (Current)
- Interactive questionnaire to determine Siddha body type (dosha)
- ML-powered analysis to classify users into body types using MLP Classifier
- Personalized recommendations for diet, lifestyle, and exercise

### Future Stages
- Stage 2: Mudra posture correction with real-time feedback
- Stage 3: Interactive chatbot for health advice based on Siddha practices

## Project Structure

The project follows an MVC (Model-View-Controller) architecture for the frontend and a Flask REST API for the backend ML model:

### Frontend
- **Model**: Contains the data and business logic
- **View**: Handles the presentation and UI components
- **Controller**: Manages user interactions and connects the Model and View

### Backend
- Flask REST API that serves the trained ML model
- Scikit-learn pipeline with MLP Classifier for body type prediction

