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
        <button type="submit" class='registro'>Crear una cuenta</button>
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



<style scoped src="../styles/login.css"></style>
