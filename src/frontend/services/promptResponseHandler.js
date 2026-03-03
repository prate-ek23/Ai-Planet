import axios from 'axios';

export const handlePrompt = async (query) => {
  console.log('Handling prompt:', query);
  let response;
  try {
    response = await axios.post('http://localhost:8000/chat/', {
      prompt: query,
    });
    console.log('Response: ', response.data);
    return response.data || 'No response from server';
  } catch (error) {
    console.error('Error handling prompt:', error);
    return error.message || 'An error occurred while processing your request';
  }
};
