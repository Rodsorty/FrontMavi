import $ from 'jquery';
import { verifyToken } from './authService'; 


// Función para realizar solicitudes autenticadas
// Primero se verificara el token a la primera API
// Luego ejecutará la llamada a la segunda
const makeAuthenticatedRequest = (apiCall, ...params) => {
    verifyToken((error, response) => {
        if (error) {
            console.error('No se puede realizar la solicitud debido a un problema con la autenticación.');
            return;
        }
        apiCall(...params);
    });
};


// Obtener clientes
export const getClients = (callback) => {
    makeAuthenticatedRequest(() => {
        $.ajax({
            url: 'http://localhost:3000/api/clientes',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            success: function(data) {
                console.log('Clientes:', data);
                if (callback) callback(data); // Llama al callback con los datos recibidos
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener clientes:', error);
                if (callback) callback(error, null);
            }
        });
    });
};

// Eliminar cliente
export const deleteClient = (id, callback) => {
    makeAuthenticatedRequest(() => {
        $.ajax({
            url: `http://localhost:3000/api/clientes/${id}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            success: function(response) {
                console.log('Cliente eliminado:', response);
                if (callback) callback(null, response);
            },
            error: function(xhr, status, error) {
                console.error('Error al eliminar cliente:', error);
                if (callback) callback(error, null);
            }
        });
    });
};

// Crear cliente
export const createClient = (clientData, callback) => {
    makeAuthenticatedRequest(() => {
        $.ajax({
            url: 'http://localhost:3000/api/clientes',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: JSON.stringify(clientData),
            success: function(response) {
                console.log('Cliente guardado:', response);
                if (callback) callback(null, response);
            },
            error: function(xhr, status, error) {
                console.error('Error al guardar cliente:', error);
                if (callback) callback(error, null);
            }
        });
    });
};

// Actualizar cliente
export const updateClient = (id, clientData, callback) => {
    makeAuthenticatedRequest(() => {
        $.ajax({
            url: `http://localhost:3000/api/clientes/${id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: JSON.stringify(clientData),
            success: function(response) {
                console.log('Cliente actualizado:', response);
                if (callback) callback(null, response);
            },
            error: function(xhr, status, error) {
                console.error('Error al actualizar cliente:', error);
                if (callback) callback(error, null);
            }
        });
    });
};
