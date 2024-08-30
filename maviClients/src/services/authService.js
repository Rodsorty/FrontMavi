import $ from 'jquery';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

//==========================================
//====USO DE MI SERVICIO DE LOGIN===========
//==========================================

const LOGIN_URL = `${API_BASE_URL}/login`;
const REGISTER_URL = `${API_BASE_URL}/register`;
const VERIFY_URL = `${API_BASE_URL}/verify`;
const LOGOUT_URL = `${API_BASE_URL}/logout`;


const getHeaders = (token = null) => {
    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

/**
 * Inicio de sesión
 */
export const login = (email, password, callback) => {
    $.ajax({
        url: LOGIN_URL,
        method: 'POST',
        headers: getHeaders(),
        data: JSON.stringify({ email, password }),
        success: function(response) {
            localStorage.setItem('token', response.token);
            if (callback) callback(null, response);
        },
        error: function(xhr, status, error) {
            console.error('Error en login:', error);
            let errorMessage = 'An unknown error occurred.';
            try {
                const response = JSON.parse(xhr.responseText);
                errorMessage = response.message || errorMessage;
            } catch (e) {
                errorMessage = error;
            }
            if (callback) callback(errorMessage, null);
        }
    });
};




/**
 * Registro
 */
export const register = (email, password, username, name, callback) => {
    $.ajax({
        url: REGISTER_URL,
        method: 'POST',
        headers: getHeaders(),
        data: JSON.stringify({ email, password, username, name }),
        success: function(response) {
           
            if (callback) callback(null, response);
        },
        error: function(xhr, status, error) {
            console.error('Error en registro:', error);
            const response = JSON.parse(xhr.responseText);
            if (callback) callback(response.message, null);
        }
    });
};

/**
 * Verifica un token desde el almacenamiento del navegador
 */
export const verifyToken = (callback) => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No se encontró ningún token en el almacenamiento local.');
        if (callback) callback('No se encontró ningún token', null);
        return;
    }

    $.ajax({
        url: VERIFY_URL,
        method: 'POST',
        headers: getHeaders(token),
        success: function(response) {
            if (callback) callback(null, response);
        },
        error: function(xhr, status, error) {
            console.error('Error en login:', error);
            let errorMessage = 'An unknown error occurred.';
            try {
                const response = JSON.parse(xhr.responseText);
                errorMessage = response.message || errorMessage;
            } catch (e) {
                errorMessage = error;
            }
            if (callback) callback(errorMessage, null);
        }
    });
};

/**
 * Cierra sesión
 */
export const logout = (callback) => {
    const token = localStorage.getItem('token');
    console.log('Token en localStorage:', token);

    if (!token) {
        console.error('No se encontró ningún token en el almacenamiento local.');
        if (callback) callback('No se encontró ningún token', null);
        return;
    }

    $.ajax({
        url: LOGOUT_URL,
        method: 'POST',
        headers: getHeaders(token),
        success: function(response) {
            console.log('Logout exitoso:', response);
            localStorage.removeItem('token');
            if (callback) callback(null, response);
        },
        error: function(xhr, status, error) {
            console.error('Error en logout:', error);
            const response = JSON.parse(xhr.responseText);
            if (callback) callback(response.message, null);
        }
    });
};
