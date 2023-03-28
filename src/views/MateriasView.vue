<script setup>
import { ref } from 'vue'
import MateriaComponent from '../components/MateriaComponent.vue'

const materias = ref([
  {
    title: 'Título de la materia',
    professor: 'Cristiano Ronaldo',
    classroom: 'La Congeladora',
    days: ['Lunes', 'Miercoles', 'Viernes'],
    schedule: '7:00 - 9:00'
  },
  {
    title: 'Título de la materia',
    professor: 'Cristiano Ronaldo',
    classroom: 'La Congeladora',
    days: ['Lunes'],
    schedule: '7:00 - 9:00'
  },
  {
    title: 'Título de la materia',
    professor: 'Cristiano Ronaldo',
    classroom: 'La Congeladora',
    days: ['Lunes', 'Miercoles'],
    schedule: '7:00 - 9:00'
  },
  {
    title: 'Título de la materia',
    professor: 'Cristiano Ronaldo',
    classroom: 'La Congeladora',
    days: ['Lunes', 'Miercoles', 'Viernes'],
    schedule: '7:00 - 9:00'
  }
])
</script>

<template>
  <h1>MATERIAS INSCRITAS</h1>
  <div>
    <MateriaComponent v-for="(materia, index) in materias" v-bind="materia" :key="index" />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  color: var(--blue);
}
</style>
