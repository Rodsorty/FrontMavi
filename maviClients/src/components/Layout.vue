
<template>
  <div class="layout">
    <header class="header">
      <div class="header-content">MAVI - Control de clientes</div>
    </header>
    <main class="main-content">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
  
</script>



//====================
//Estilos
//====================

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
  font-size: 1.2em;
  text-align: center;
}

.main-content {
  margin-top: 60px; 
  padding: 20px;
  flex: 1; 
}
</style>