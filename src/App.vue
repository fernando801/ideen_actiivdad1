<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <v-layout>
    <v-app-bar class="px-md-8 mr-auto" color="#384FFE">
      <v-img class="logo" src="/logoTec.png" alt="logo" aspect-ratio="16/9" />
      <v-spacer class="d-none d-sm-block" />
      <div class="ml-auto">
        <RouterLink class="link pa-4" to="/">INICIO</RouterLink>
        <RouterLink class="link pa-4" to="/materias">LISTA DE MATERIAS</RouterLink>
      </div>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped>
.link {
  color: white;
  font-weight: bold;
}

.logo {
  max-width: 12rem;
}
</style>
