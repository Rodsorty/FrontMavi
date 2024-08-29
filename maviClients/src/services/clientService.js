import $ from 'jquery';

export const getClients = (callback) => {
    $.ajax({
        url: 'http://localhost:3000/api/clientes',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', 
        },
        success: function(data) {
            console.log('Clientes:', data);
            if (callback) callback(data); // Llama al callback con los datos recibidos
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener clientes:', error);
            const errorDiv = document.createElement('div');
            errorDiv.style.color = 'red';
            errorDiv.textContent = 'Error al obtener clientes';
            document.body.appendChild(errorDiv);
        }
    });
};



export const deleteClient = (id, callback) => {
    $.ajax({
        url: `http://localhost:3000/api/clientes/${id}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json', 
        },
        success: function(response) {
            console.log('Cliente eliminado:', response);
            if (callback) callback(null, response); 
        },
        error: function(xhr, status, error) {
            console.error('Error al eliminar cliente:', error);
            
            const errorDiv = document.createElement('div');
            errorDiv.style.color = 'red';
            errorDiv.textContent = 'Error al eliminar cliente';
            document.body.appendChild(errorDiv);
            if (callback) callback(error, null); 
        }
    });
};
