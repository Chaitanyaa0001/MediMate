import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const usepostdoctor = () =>{
  const createdoctor = async (doctordata) =>{
    try {
      const res = await axios.post(`${BASE_URL}/api/doctors/register`,doctordata,{withCredentials: true});
      return res.data; 
    } catch (err) {
      console.error('error while posting the doctor ',err);
    }
  };
  return {createdoctor}
}