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

export const chatWithPDF = async (question) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { question });
    
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