import $ from 'jquery';

// const url = "http://localhost:3000/api/clientes";
const url = "http://localhost:3000/api/clientes";

// Obtener clientes
export const getClients = (callback) => {
    $.ajax({
        url: url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        success: function(data) {
            if (callback) callback(data); // Llama al callback con los datos recibidos
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener clientes:', error);
            if (callback) callback(error, null);
        }
    });
};

// Eliminar cliente
export const deleteClient = (id, callback) => {
    $.ajax({
        url: `${url}/${id}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        success: function(response) {
            if (callback) callback(null, response);
        },
        error: function(xhr, status, error) {
            console.error('Error al eliminar cliente:', error);
            if (callback) callback(error, null);
        }
    });
};

// Crear cliente
export const createClient = (clientData, callback) => {
    $.ajax({
        url: url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: JSON.stringify(clientData),
        success: function(response) {
            if (callback) callback(null, response);
        },
        error: function(xhr, status, error) {
            console.error('Error al guardar cliente:', error);
            if (callback) callback(error, null);
        }
    });
};

// Actualizar cliente
export const updateClient = (id, clientData, callback) => {
    $.ajax({
        url: `${url}/${id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: JSON.stringify(clientData),
        success: function(response) {
            if (callback) callback(null, response);
        },
        error: function(xhr, status, error) {
            console.error('Error al actualizar cliente:', error);
            if (callback) callback(error, null);
        }
    });
};
