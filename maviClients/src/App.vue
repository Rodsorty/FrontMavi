<template>
  <Layout @logoutSuccess="handleLogoutSuccess">
    <template #default>
      <!-- Muestra un mensaje de carga mientras se verifica el token -->
      <div v-if="isLoading" class="loading">Cargando...</div>

      <!-- Si el usuario está autenticado, muestra clientes -->
      <Clients v-if="!isLoading && isAuthenticated" />

      <!-- sino, login -->
      <Login v-else-if="!isLoading" @loginSuccess="handleLoginSuccess" />
    </template>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Layout from "./components/Layout.vue";
import Clients from "./components/Clientes.vue";
import Login from "./components/Login.vue";
import { verifyToken } from "./services/authService";

const isAuthenticated = ref(false);
const isLoading = ref(true);

//Si esta la sesión iniciada se va directo a clientes sino login
const checkAuthentication = () => {
  verifyToken((error, response) => {
    if (error) {
      isAuthenticated.value = false;
    } else {
      isAuthenticated.value = true;
    }
    isLoading.value = false;
  });
};

const handleLoginSuccess = () => {
  isAuthenticated.value = true;
};

const handleLogoutSuccess = () => {
  isAuthenticated.value = false;
};

onMounted(() => {
  checkAuthentication();
});
</script>

<style>
.loading {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
}
</style>
