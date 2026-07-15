import axios from 'axios';

// Ensure this matches your backend URL
const API_URL = 'http://127.0.0.1:8000';

export const uploadPDF = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_URL}/upload-pdf`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

export const chatWithPDF = async (question, detailLevel = "detailed", creativity = 0.3) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { question: question, detailLevel: detailLevel, creativity: creativity });

    // DEBUGGING: Log the full response to the browser console (F12)
    console.log("Full Backend Response:", response.data);

    // Check if the backend sent an error message instead of an answer
    if (response.data.error) {
      return "⚠️ Backend Error: " + response.data.error;
    }

    // Check if the answer exists
    if (response.data.answer) {
      return response.data.answer;
    }

    return "⚠️ Error: Received an empty response from the server.";

  } catch (error) {
    console.error("Chat failed:", error);
    return "⚠️ Network Error: Unable to reach the backend.";
  }
};

export const generateQuiz = async (topic, difficulty, length, format) => {
  try {
    const response = await axios.post(`${API_URL}/generate-quiz`, {
      topic: topic,
      difficulty: difficulty,
      length: length,
      format: format
    });
    return response.data.questions;
  } catch (error) {
    console.warn("Backend not ready yet. Using dummy data for frontend testing!");

    // Fallback dummy data to test the UI until we build the backend
    return [
      {
        type: 'TF',
        text: 'A black hole is a region of spacetime where gravity is so strong that nothing can escape.',
        correctAnswer: 'True'
      },
      {
        type: 'MCQ',
        text: 'Which telescope was launched in 2021 to succeed the Hubble?',
        options: ['Kepler', 'James Webb', 'Chandra', 'Spitzer'],
        correctAnswer: 'James Webb'
      },
      {
        type: 'TF',
        text: 'The sun is considered a planet in modern astrophysics.',
        correctAnswer: 'False'
      }
    ];
  }
};