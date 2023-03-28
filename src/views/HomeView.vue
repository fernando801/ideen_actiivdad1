<script setup>
import StudentInfo from '../components/StudentInfo.vue'
import { ref } from 'vue'

const data = ref([
  {
    title: 'Nombre Completo',
    info: 'Juan Escutia'
  },
  {
    title: 'Matricula',
    info: 'A01361234'
  },
  {
    title: 'Correo Institucional',
    info: 'A01361234@tec.mx'
  },
  {
    title: 'Carrera',
    info: 'ISC'
  },
  {
    title: 'Correo Personal',
    info: 'murioporlapatria@gmail.com'
  }
])
</script>

<template>
  <h1>INFORMACIÓN DEL ALUMNO</h1>
  <div class="avatar rounded_circle">
    <v-img src="/alumno.jpeg" alt="alumno" cover />
  </div>
  <v-container class="info pa-8 px-4 mx-auto my-8">
    <v-row>
      <v-col v-for="(item, index) in data" cols="12" sm="12" md="6" :key="index">
        <StudentInfo :title="item.title" :info="item.info" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h1 {
  text-align: center;
  color: var(--blue);
}

.avatar {
  overflow: hidden;
  margin: 2rem auto;
  aspect-ratio: 1;
  max-width: 12rem;
  border-radius: 9999999999px;
}

.info {
  max-width: 40rem;
  /* padding: 2rem; */
  /* margin: 2rem auto; */
}
</style>
