<script setup>
import { RouterLink } from 'vue-router'
import { session } from '../globalState.js'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

async function logout() {
  try {
    await signOut(getAuth())
    session.user = getAuth().currentUser
    router.push('/login')
  } catch {
    console.log('unable to signout')
  }
}
</script>

<template>
  <v-app-bar class="px-md-8 mr-auto" color="#384FFE">
    <v-img class="logo" src="/logoTec.png" alt="logo" aspect-ratio="16/9" />
    <v-spacer class="d-none d-sm-block" />
    <div class="ml-auto">
      <template v-if="session.user">
        <RouterLink class="link pa-4" to="/">INICIO</RouterLink>
        <RouterLink class="link pa-4" to="/materias">LISTA DE MATERIAS</RouterLink>
        <v-btn class="link" @click="logout" icon="mdi-logout"></v-btn>
      </template>
      <template v-else>
        <RouterLink class="link pa-4" to="/login">INICIAR SESIÓN</RouterLink>
        <RouterLink class="link pa-4" to="/register">REGISTRARSE</RouterLink>
      </template>
    </div>
  </v-app-bar>
</template>

<style>
.link {
  color: white;
  font-weight: bold;
  z-index: 333333333333;
}

.logo {
  max-width: 12rem;
}
</style>
