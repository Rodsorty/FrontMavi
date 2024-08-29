<template>
  <div class="layout">
    <header class="header">
      <div class="header-content">
        <div class="title">MAVI - Control de clientes</div>
        <button v-if="token" class="logout-button" @click="handleLogout">Cerrar sesión</button>
      </div>
    </header>
    <main class="main-content">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { logout as authLogout } from '../services/authService'; 
import { eventBus } from '../services/eventBus'; // Importar el Event Bus

const emit = defineEmits(['logoutSuccess']);

const token = ref(localStorage.getItem('token'));

// Función para verificar el token
const checkToken = () => {
  token.value = localStorage.getItem('token');
};

// Función para manejar el cierre de sesión
const handleLogout = () => {
  authLogout((error, response) => {
    if (!error) {
      localStorage.removeItem('token');
      token.value = null;
      emit('logoutSuccess'); 
    }
  });
};

// Escuchar eventos de inicio de sesión
eventBus.$on('loginSuccess', () => {
  checkToken();
});

onMounted(() => {
  checkToken();
});
</script>

<style scoped>
/* Tus estilos aquí */
</style>



<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}

.header {
  background-color: #28a745; 
  width: 100%;
  color: #fff;
  padding: 10px;
  position: fixed; 
  top: 0;
  left: 0;
  z-index: 1000; 
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  flex: 1;
  text-align: center;
  font-size: 1.2em;
}

.logout-button {
  background: orange;
  border: none;
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  margin-right: 20px; 
}

.main-content {
  margin-top: 60px; 
  padding: 20px;
  flex: 1; 
}
</style>
