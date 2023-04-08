<script setup>
import { RouterView } from 'vue-router'
import { session } from './globalState.js'
import { useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'

const router = useRouter()

if (!session.user) {
  router.push('login')
}
</script>

<template>
  <v-layout>
    <NavBar />
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>
