import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGemini = () =>{
    const sendprompt =  async (prompt) =>{
        try {
            const res = await axios.post(`${BASE_URL}/api/chat`,{prompt},{ withCredentials: true });
            return res.data.reply;
        } catch (err) {
            console.error('Gemini error !', err.message);
        }
    };
    return {sendprompt}
};