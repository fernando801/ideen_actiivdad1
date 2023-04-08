<script setup>
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { ref, onMounted } from 'vue'
import MateriaComponent from '../components/MateriaComponent.vue'

const db = getFirestore()

const materias = ref([])

onMounted(async () => {
  // const user = await signInWithEmailAndPassword(auth, 'myuser@test.com', 'password')
  const querySnapshot = await getDocs(collection(db, 'materias'))
  const data = []
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
  })
  materias.value = data
})
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
