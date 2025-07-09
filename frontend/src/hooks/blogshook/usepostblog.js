import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export  const usepostblog = () =>{
    const createblog =  async (formdata) =>{
        try {
            const res = await axios.post(`${BASE_URL}/api/blogs`,
                {
                    title: formdata.title,
                    summary: formdata.summary,
                },
                {withCredentials:true});
                return res.data;
      } catch (err) {
        console.error("post blog axios error !", err);
      };
    };
    return {createblog}
}