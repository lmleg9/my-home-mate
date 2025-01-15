import axios from "axios";

const API_URL = "http://localhost:3000";

// Fetch potential flatmates for a specific home
export const getFlatmatesForHome = async (homeId) => {
    try {
        const response = await axios.get(`${API_URL}/homes/${homeId}/flatmates`);
        return response.data;
    } catch (error) {
        console.error("Error fetching flatmates:", error);
        throw error;
    }
};