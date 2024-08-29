<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Usuario</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" required />
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '../services/authService'; 
import { eventBus } from '../services/eventBus';
const emit = defineEmits(['loginSuccess']);

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = () => {
  login(username.value, password.value, (error, response) => {
    if (error) {
      console.error('Error en login:', error);
      errorMessage.value = error;
    } else {
      errorMessage.value = '';
      eventBus.$emit('loginSuccess'); 
      emit('loginSuccess');
    }
  });
};
</script>



<style scoped>
.login-container {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
}

.login-box {
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

h2 {
  margin-bottom: 1.5rem;
  color: #343a40;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #495057;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.7rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
