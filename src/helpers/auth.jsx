import { redirect } from "react-router-dom";
import axios from '../api/axios';

export function getAuthToken() {
    const token = localStorage.getItem('token')
    return token;
}

export function checkAuthLoader() {
    const token = getAuthToken();
    if (!token) {
        return redirect('/login')
    }
    else {
        return true;
    }
}

export async function verifyToken() {

    const token = getAuthToken()
    try {
        const response = await axios.get('/auth/verify',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true
            }
        );
        if (!response.data.status) {
            localStorage.removeItem('token')
            return false
        }
        else {
            return true
        }
    } catch (error) {
        return false
    }

}