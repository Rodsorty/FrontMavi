<template>
  <div class="login-container">
    <div class="login-box">
      <h2>{{ crearCuenta ? "Registrar" : "Iniciar Sesión" }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group" v-if="crearCuenta">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group" v-if="crearCuenta">
          <label for="username">User name</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <button type="submit">
          {{ crearCuenta ? "Registrar" : "Iniciar Sesión" }}
        </button>
        <button type="button" class="registro" @click="toggleCrearCuenta">
          {{
            crearCuenta
              ? "Ya tienes cuenta? Iniciar sesión"
              : "Crear una cuenta"
          }}
        </button>
      </form>
    </div>
  </div>
  <Loading :show="isLoading" />
</template>

<script setup>
import { ref } from "vue";
import { login, register } from "../services/authService";
import { eventBus } from "../services/eventBus";
import Loading from "../utils/Loading.vue";

const emit = defineEmits(["loginSuccess"]);

const email = ref("");
const password = ref("");
const username = ref("");
const name = ref("");
const errorMessage = ref("");
const crearCuenta = ref(false);
const isLoading = ref(false);

const toggleCrearCuenta = () => {
  crearCuenta.value = !crearCuenta.value;
};

const handleSubmit = () => {
  isLoading.value = true;

  if (crearCuenta.value) {
    // Registro
    register(
      email.value,
      password.value,
      username.value,
      name.value,
      (error, response) => {
        isLoading.value = false;
        if (error) {
          console.error("Error en registro:", error);
          errorMessage.value = error;
        } else {
          crearCuenta.value = false;
          errorMessage.value = "";
        }
      }
    );
  } else {
    // Inicio de sesión
    login(email.value, password.value, (error, response) => {
      isLoading.value = false;
      if (error) {
        console.error("Error en login:", error);
        errorMessage.value = error;
      } else {
        errorMessage.value = "";
        eventBus.$emit("loginSuccess");
        emit("loginSuccess");
      }
    });
  }
};
</script>

<style scoped src="../styles/login.css"></style>
