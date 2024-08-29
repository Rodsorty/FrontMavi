<template>
  <div v-if="visible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h4>{{ mode === 'edit' ? 'Editar Cliente' : 'Agregar Nuevo Cliente' }}</h4>
      <form @submit.prevent="saveClient">
        <div>
          <label for="nombre">Nombre:</label>
          <input v-model="form.nombre" id="nombre" type="text" required />
        </div>
        <div>
          <label for="apellidoPaterno">Apellido Paterno:</label>
          <input v-model="form.apellidoPaterno" id="apellidoPaterno" type="text" required />
        </div>
        <div>
          <label for="apellidoMaterno">Apellido Materno:</label>
          <input v-model="form.apellidoMaterno" id="apellidoMaterno" type="text" />
        </div>
        <div>
          <label for="domicilio">Domicilio:</label>
          <input v-model="form.domicilio" id="domicilio" type="text" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="form.email" id="email" type="email" required />
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <button type="submit" class="guardar">Guardar</button>
        <button type="button" @click="closeModal" class="cancelar">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  visible: Boolean,
  mode: String, // "create" or "edit"
  client: Object,
  onSave: Function,
});

const emit = defineEmits(['close']);

const form = ref({
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  domicilio: '',
  email: '',
});

const errorMessage = ref('');

watch(() => props.client, (newClient) => {
  if (props.mode === 'edit' && newClient) {
    form.value = { ...newClient };
  }
}, { immediate: true });

const closeModal = () => {
  emit('close');
  errorMessage.value = '';
};

const validateForm = () => {
  if (!form.value.nombre || !form.value.apellidoPaterno || !form.value.domicilio || !form.value.email) {
    errorMessage.value = 'Todos los campos obligatorios deben ser completados.';
    return false;
  }
  return true;
};

const saveClient = () => {
  if (validateForm()) {
    if (props.onSave) {
      props.onSave({ ...form.value, id: props.client?.id }); // Asegúrate de que el id se pase si está en modo edición
    }
    closeModal();
  }
};
</script>


<style scoped>

.error-message {
  color: red;
  font-size: 12px;
  margin-bottom: 1rem;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-content h4 {
  color: black;
  margin-top: 0;
}

.modal-content form div {
  margin-bottom: 1rem;
}

.modal-content label {
  color: black;
  font-size: 12px;
  display: block;
}

.modal-content input {
  background-color: white;
  color: black;
  width: 95%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal-content button {
  padding: 10px;
  border-radius: 5px;
  font-size: 10px;
  margin-right: 10px;
}

.guardar {
  background: blue;
}

.cancelar {
  background: gray;
}
</style>
