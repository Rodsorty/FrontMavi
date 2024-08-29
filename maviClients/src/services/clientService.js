import $ from 'jquery';

// Obtener clientes
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
          console.error('Error al crear cliente:', error);
          if (callback) callback(error, null);
        }
    });
};


// Eliminar cliente
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
          if (callback) callback(error, null);
        }
    });
};


export const createClient = (clientData, callback) => {
  $.ajax({
    url: 'http://localhost:3000/api/clientes',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
};


export const updateClient = (id, clientData, callback) => {
  $.ajax({
    url: `http://localhost:3000/api/clientes/${id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
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
};
