
<template>
  <div>
    <button @click="addClient" class="add-client-btn">Nuevo Cliente</button>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <div class="clients-container">
      <div v-for="client in clients" :key="client.id" class="client-card">
        <h3>{{ client.nombre }} {{ client.apellidoPaterno }} {{ client.apellidoMaterno }}</h3>
        <p><strong>Domicilio:</strong> {{ client.domicilio }}</p>
        <p><strong>Email:</strong> {{ client.email }}</p>
        <div class="client-actions">
          <button class="editar" @click="editClient(client.id)">Editar</button>
          <button class="borrar" @click="removeClient(client.id)">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { getClients, deleteClient } from '../services/clientService';

const clients = ref([]);
const error = ref(null);
const successMessage = ref(null);

const fetchClients = () => {
  getClients((data) => {
    clients.value = Array.isArray(data) ? data : [];
  });
};

const addClient = () => {
  // Lógica para agregar un cliente
};

const editClient = (id) => {
  // Lógica para editar un cliente
};

const removeClient = (id) => {
  deleteClient(id, (err, response) => {
    if (err) {
      error.value = err;
    } else {
      // Actualizar la lista de clientes después de eliminar uno
      clients.value = clients.value.filter(client => client.id !== id);
      successMessage.value = 'Cliente eliminado exitosamente';

      // Ocultar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        successMessage.value = null;
      }, 3000);
    }
  });
};

onMounted(() => {
  fetchClients();
});

</script>



<style scoped>

.success-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    background-color: red;
    border-radius: 10px;
    border: 1px solid gray;
    padding: 10px;
    display: inline-block;
    max-width: 80%;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}




.clients-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; 
  color : black;
}

.client-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px; /* Ajusta el ancho según sea necesario */
}

.client-card h3 {
  font-size : 12px;
  margin: 0 0 0.5rem 0;
}

.client-card p {
  margin: 0.5rem 0;
  font-size : 12px
}

.client-actions {
  display: flex;
  gap: 0.5rem; /* Espacio entre botones */
  margin-top: 1rem;
}

.client-actions button {
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0.5em 1em;
  font-size: 0.9em;
  cursor: pointer;
  transition: border-color 0.25s, background-color 0.25s;
}

.client-actions button:hover {
  border-color: #646cff;
}

.add-client-btn {
  margin-bottom: 1rem;
  border: none;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  background-color: #28a745;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.25s;
}

button {
    width : 100px;
}

.editar {
    background: rgba(0, 0, 255, 0.7); 
    color: white; 
}

.borrar {
    background: rgba(255, 0, 0, 0.7); 
    color: white; 
}


.add-client-btn:hover {
  background-color: #218838;
}
</style>
