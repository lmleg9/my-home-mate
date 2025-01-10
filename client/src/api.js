import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your back-end URL if hosted

export const getHomes = async () => {
    try {
        const response = await axios.get(`${API_URL}/homes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching homes:', error);
        throw error;
    }
};
