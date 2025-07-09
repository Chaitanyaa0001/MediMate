import axios from "axios"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../redux/slice";
const BASE_URL = import.meta.env.VITE_API_URL;

export const uselogout = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = async () =>{
        try {
            await axios.get(`${BASE_URL}/api/auth/logout`,{withCredentials:true});
            dispatch(clearAuth());
            navigate('/')
        } catch (err) {
            console.error("logout error in axios !",err.message);      
        };
    };
    return {logout};
}