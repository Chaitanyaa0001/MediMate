import axios from "axios"
import { useState } from "react"
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export  const usepostblog = () =>{
    const [, set] = useState(second)
    const createblog =  async (formdata) =>{
        try {
            const res = await axios.get(`${BASE_URL}/api/blogs`,
                {
                    title: formdata
                }
                {withCredentials:true});

        
      } catch (err) {
        
      }

    }
      
}