<template>
  <div>
    <button @click="openModal" class="add-client-btn">Nuevo Cliente</button>
    <input v-model="searchQuery" @input="searchClients" placeholder="Buscar cliente (nombre)..." class="search-input" />
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="successMessage" :class="successClass">{{ successMessage }}</div>
    <div class="clients-container">
      <div v-for="client in clients" :key="client.id" class="client-card">
        <h3>{{ client.nombre }} {{ client.apellidoPaterno }} {{ client.apellidoMaterno }}</h3>
        <p><strong>Domicilio:</strong> {{ client.domicilio }}</p>
        <p><strong>Email:</strong> {{ client.email }}</p>
        <div class="client-actions">
          <button class="editar" @click="editClient(client)">Editar</button>
          <button class="borrar" @click="removeClient(client.id)">Eliminar</button>
        </div>
      </div>
    </div>

    <ClientModal
      :visible="showModal"
      :mode="currentClient ? 'edit' : 'create'"
      :client="currentClient"
      @close="closeModal"
      @save="handleSaveClient"
    />
  </div>
</template>



<script setup>
import { ref, onMounted, computed } from 'vue';
import { getClients, deleteClient, createClient, updateClient } from '../services/clientService';
import ClientModal from './modal/ClientModal.vue';

const clients = ref([]);
const error = ref(null);
const successMessage = ref(null);
const successType = ref(''); // 'create', 'update', 'delete'
const searchQuery = ref('');
const showModal = ref(false);
const currentClient = ref(null);

const fetchClients = (query = '') => {
  getClients((data) => {
    clients.value = Array.isArray(data) ? data.filter(client => client.nombre.toLowerCase().includes(query.toLowerCase())) : [];
  });
};

const searchClients = () => {
  fetchClients(searchQuery.value);
};

const openModal = () => {
  currentClient.value = { nombre: '', apellidoPaterno: '', apellidoMaterno: '', domicilio: '', email: '' };
  showModal.value = true;
};

const editClient = (client) => {
  currentClient.value = { ...client };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleSaveClient = (clientData) => {
  if (clientData.id) {
    updateClient(clientData.id, clientData, (err, response) => {
      if (err) {
        console.error('Error updating client:', err);
        error.value = err;
      } else {
        clients.value = clients.value.map(client => client.id === clientData.id ? clientData : client);
        successMessage.value = 'Cliente actualizado exitosamente';
        successType.value = 'update'; // Update success type
        setTimeout(() => {
          successMessage.value = null;
        }, 3000);
      }
    });
  } else {
    createClient(clientData, (err, response) => {
      if (err) {
        console.error('Error creating client:', err);
        error.value = err;
      } else {
        clients.value.push(response);
        successMessage.value = 'Cliente agregado exitosamente';
        successType.value = 'create'; // Create success type
        setTimeout(() => {
          successMessage.value = null;
        }, 3000);
      }
    });
  }
  closeModal();
};

const removeClient = (id) => {
  deleteClient(id, (err, response) => {
    if (err) {
      console.error('Error removing client:', err);
      error.value = err;
    } else {
      clients.value = clients.value.filter(client => client.id !== id);
      successMessage.value = 'Cliente eliminado exitosamente';
      successType.value = 'delete'; // Delete success type
      setTimeout(() => {
        successMessage.value = null;
      }, 3000);
    }
  });
};

onMounted(() => {
  fetchClients();
});

const successClass = computed(() => {
  switch (successType.value) {
    case 'create':
      return 'success-message success-create';
    case 'update':
      return 'success-message success-update';
    case 'delete':
      return 'success-message success-delete';
    default:
      return 'success-message';
  }
});
</script>

<style scoped src="../styles/ClientComponent.css"></style>
