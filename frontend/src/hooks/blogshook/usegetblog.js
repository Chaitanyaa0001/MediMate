import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usegetblogs = () =>{
    const [blogdata, setblogdata] = useState(null);
    const getblogs =  async () =>{
        try {
            const res = await axios.get(`${BASE_URL}/api/blogs`,{withCredentials:true})
            setblogdata(res.data)
        } catch (err) {
            console.error("AXIos error of blogs ",err);
        }

         useEffect(()=>{
            getblogs();
        })
    }
    return {blogdata};
}