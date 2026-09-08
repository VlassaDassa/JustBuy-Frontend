import axios from 'axios';
import { API_ROUTES } from './apiConfig';




// Register user
export function registerUser(data) {
    return axios.post(API_ROUTES.auth.registerUser, data)
}


// Login user
export function loginUser(data) {
    return axios.post(API_ROUTES.auth.loginUser, data)
}


// Logout user
export function logoutUser(refreshToken) {
    return axios.post(API_ROUTES.auth.logoutUser, {
        refresh_token: refreshToken,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
    })
}


// Refresh access token
export function refreshToken(refreshToken) {
    return axios.post(API_ROUTES.auth.refreshToken, { refresh_token: refreshToken })
}