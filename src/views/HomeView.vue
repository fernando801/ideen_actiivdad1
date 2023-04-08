<script setup>
import { onMounted, ref } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, getDoc, doc } from 'firebase/firestore'
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'

const data = ref({
  fullName: '',
  studentId: '',
  studentEmail: '',
  personalEmail: '',
  major: ''
})

const userImage = ref('')

onMounted(async () => {
  const auth = getAuth()
  const user = auth.currentUser

  const db = getFirestore()
  const docRef = doc(db, 'users', user.uid)
  const docSnap = await getDoc(docRef)

  const storage = getStorage()

  userImage.value = await getDownloadURL(storageRef(storage, 'user.jpg'))
  data.value = docSnap.data()
})
</script>

<template>
  <h1>INFORMACIÓN DEL ALUMNO</h1>
  <div class="avatar rounded_circle">
    <v-img :src="userImage" alt="alumno" cover />
  </div>
  <v-container class="info pa-8 px-4 mx-auto my-8">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <h3>Nombre Completo</h3>
        <p>{{ data.fullName }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <h3>Matrícula</h3>
        <p>{{ data.studentId }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <h3>Correo Institucional</h3>
        <p>{{ data.studentEmail }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <h3>Carrera</h3>
        <p>{{ data.major }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <h3>Correo Personal</h3>
        <p>{{ data.personalEmail }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h1 {
  text-align: center;
  color: var(--blue);
}

h3,
p {
  font-size: 1.2rem;
  font-weight: bold;
}

h3 {
  color: var(--blue);
}

p {
  color: var(--gray);
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
