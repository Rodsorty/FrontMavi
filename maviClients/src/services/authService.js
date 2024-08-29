import $ from 'jquery';

const LOGIN_URL = 'https://d2ch8ltrwj.execute-api.us-east-1.amazonaws.com/prod/login';
const VERIFY_URL = 'https://d2ch8ltrwj.execute-api.us-east-1.amazonaws.com/prod/verify';
const LOGOUT_URL = 'https://d2ch8ltrwj.execute-api.us-east-1.amazonaws.com/prod/logout'; // URL para cerrar sesión
const API_KEY = 'NThxI7cLCM8tv0P4iLbVD1Vi7lPSvVPL1zETpxxn';

/**
 * Inicio de sesión
 */
export const login = (email, password, callback) => {
    $.ajax({
        url: LOGIN_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        data: JSON.stringify({
            email,
            password
        }),
        success: function(response) {
            localStorage.setItem('token', response.token);
            if (callback) callback(null, response);
        },
        error: function(xhr, status, error) {
            console.error('Error en login:', error);
            const response = JSON.parse(xhr.responseText);
            if (callback) callback(response.message, null); // Pasar el mensaje de error
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
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            console.log('Token verificado:', response);
            if (callback) callback(null, response);
        },
        error: function(xhr, status, error) {
            console.error('Error al verificar token:', error);
            if (callback) callback(error, null);
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
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${token}` 
        },
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
