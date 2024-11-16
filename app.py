import streamlit as st
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model
from joblib import load

# Load the trained model and scaler
model = load_model('C:\mini\Analysing-inventory-pricing-and-stock-data\stock_model.h5')
scaler = load('C:\mini\Analysing-inventory-pricing-and-stock-data\scaler.pkl')

# Streamlit UI
st.title("Price Elasticity Prediction")

# User input for prediction
time_steps = st.number_input('Number of Time Steps', min_value=1, max_value=60, value=30)
features = st.number_input('Number of Features', min_value=1, max_value=10, value=1)

input_data = []
for i in range(time_steps):
    feature_values = []
    for j in range(features):
        feature_value = st.number_input(f'Time Step {i+1} - Feature {j+1}', value=0.0)
        feature_values.append(feature_value)
    input_data.append(feature_values)

if st.button('Predict'):
    # Preprocess the input data
    input_data = np.array(input_data).reshape((1, time_steps, features))
    
    # Predict using the model
    prediction = model.predict(input_data)
    
    # Inverse transform the prediction
    prediction = scaler.inverse_transform(prediction)
    
    # Display the prediction
    st.write(f'Predicted Price Elasticity: {prediction[0][0]}')

    # Plot the prediction
    fig, ax = plt.subplots()
    ax.plot(range(time_steps), np.array(input_data).flatten(), label='Input Data')
    ax.axhline(y=prediction[0][0], color='r', linestyle='-', label='Predicted Price Elasticity')
    ax.legend()
    st.pyplot(fig)
