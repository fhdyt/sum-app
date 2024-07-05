import { redirect } from "react-router-dom";
import axios from '../api/axios';

export function getAuthToken() {
    const token = localStorage.getItem('token')
    return token;
}
export function getRole() {
    const token = localStorage.getItem('role')
    return token;
}
export async function checkAuth() {
    // Implementasikan logika untuk memeriksa autentikasi pengguna
    // Misalnya, periksa token dari local storage atau panggil API
    const isAuthenticated = true; // Ganti dengan logika autentikasi yang sebenarnya
    const role = 'admin'; // Ganti dengan logika untuk mendapatkan peran pengguna
    return { isAuthenticated, role };
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
        console.log(response.status)
        if (!response.status) {
            // localStorage.removeItem('token')
            return false
        }
        else {

            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }

}