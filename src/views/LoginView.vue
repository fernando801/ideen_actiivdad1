<script setup>
import { ref } from 'vue'
import { session } from '../globalState.js'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  email: '',
  password: ''
})

const isFormValid = ref(false)

const alert = ref({
  display: false,
  title: 'Los datos introducidos no son válidos',
  message: 'Favor de introducir un correo institucional y contraseña válidos',
  type: 'warning'
})

async function submit() {
  if (!isFormValid.value) {
    alert.value = {
      display: true,
      title: 'Los datos introducidos no son válidos',
      message: 'Favor de introducir un correo institucional y contraseña válidos',
      type: 'warning'
    }
    return
  }

  try {
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, formData.value.email, formData.value.password)
    session.user = auth.currentUser
    alert.value.display = false
    router.push('/')
  } catch (e) {
    const message =
      e.code === 'auth/wrong-password'
        ? 'La contraseña es incorrecta'
        : 'El correo no cuenta con una cuenta asociada'

    alert.value = {
      display: true,
      title: 'No se pudo iniciar sesión',
      message,
      type: 'error'
    }
  }
}
</script>
<template>
  <h1 class="mt-8 mb-16">INICIO DE SESÍON</h1>
  <v-form v-model="isFormValid" @submit.prevent="submit">
    <v-text-field
      v-model="formData.email"
      type="email"
      label="Correo Institucional"
      placeholder="a01234567@tec.mx"
      :rules="[
        (v) => !!v || 'Campo requerido',
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'El email debe de tener un formato válido'
      ]"
    ></v-text-field>
    <v-text-field
      v-model="formData.password"
      type="password"
      label="Contraseña"
      :rules="[(v) => v.length >= 6 || 'Mínimo 6 caracteres']"
    ></v-text-field>
    <!-- <br /> -->
    <!-- <v-alert v-model="alert.display" :type="alert.type" closable :title="alert.title"> -->
    <!--   {{ alert.message }} -->
    <!-- </v-alert> -->
    <br />
    <v-dialog v-model="alert.display">
      <v-sheet class="pa-8 mx-auto" width="100%" max-width="800" elevation="2" rounded="xl">
        <h3 class="dialog_title">{{ alert.title }}</h3>
        <div class="dialog_info">
          <p>{{ alert.message }}</p>
        </div>
        <v-row>
          <v-spacer />
          <v-btn
            class="font-weight-bold text-h6"
            color="#384FFE"
            variant="text"
            @click="alert.display = false"
            >CERRAR</v-btn
          >
        </v-row>
      </v-sheet>
    </v-dialog>
    <v-btn class="text-body-1 submit text-capitalize" type="submit">Iniciar Sesión</v-btn>
  </v-form>
</template>

<style scoped>
h1 {
  text-align: center;
  color: var(--blue);
}

.submit {
  color: white;
  font-weight: bold;
  background-color: var(--blue);
  width: 100%;
}

.dialog_title {
  text-align: center;
  font-size: 2rem;
}

.dialog_info {
  margin: 2rem 0 3rem 0;
}

.dialog_info p {
  margin: 0.25rem 0;
}

p {
  font-size: 1.2rem;
  color: var(--gray);
  font-weight: bold;
}

h3 {
  font-size: 1.2rem;
  color: var(--blue);
}

@media screen and (min-width: 960px) {
  .dialog_title {
    font-size: 2rem;
  }

  .dialog_info p {
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
  }
}
</style>
