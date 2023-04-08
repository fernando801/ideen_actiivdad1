<script setup>
import { ref } from 'vue'
import { session } from '../globalState.js'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, setDoc, doc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  fullName: '',
  studentId: '',
  studentEmail: '',
  personalEmail: '',
  password: '',
  passwordConfirmation: '',
  major: ''
})

function uppercase() {
  formData.value.major = formData.value.major.toUpperCase()
}

const termsAndConditions = ref(false)

const isFormValid = ref(false)

const alert = ref(false)
const alertData = ref({
  title: 'Los datos introducidos no son válidos',
  message: 'Favor de verificar que los datos introducidos sean correctos',
  type: 'warning'
})

async function submit() {
  if (!isFormValid.value) {
    alert.value = true
    alertData.value = {
      title: 'Los datos introducidos no son válidos',
      message: 'Favor de verificar que los datos introducidos sean correctos',
      type: 'warning'
    }
    return
  }

  try {
    const auth = getAuth()
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.value.studentEmail,
      formData.value.password
    )
    const db = getFirestore()
    const { password, passwordConfirmation, ...data } = formData.value
    await setDoc(doc(db, 'users', userCredential.user.uid), data)

    session.user = auth.currentUser
    router.push('/')
  } catch {
    alert.value = true
    alertData.value = {
      title: 'No se pudo crear la cuenta',
      message: 'El correo institucional ya cuenta con una cuenta asociada',
      type: 'error'
    }
  }
}
</script>
<template>
  <h1 class="mt-8 mb-8">CREA UNA CUENTA</h1>
  <v-form v-model="isFormValid" @submit.prevent="submit">
    <v-text-field
      v-model="formData.fullName"
      type="name"
      label="Nombre Completo"
      :rules="[(v) => !!v || 'Campo requerido']"
    ></v-text-field>
    <v-text-field
      v-model="formData.studentId"
      type="id"
      label="Matrícula"
      :rules="[(v) => !!v || 'Campo requerido']"
    ></v-text-field>
    <v-text-field
      v-model="formData.studentEmail"
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
      v-model="formData.personalEmail"
      type="email"
      label="Correo Personal"
      placeholder="example@gmail.com"
      :rules="[
        (v) => !!v || 'Campo requerido',
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'El email debe de tener un formato válido'
      ]"
    ></v-text-field>
    <v-text-field
      v-model="formData.major"
      type="text"
      label="Carrera"
      @keyup="uppercase"
      :rules="[
        (v) => !!v || 'Campo requerido',
        (v) => (v.length >= 2 && v.length <= 4) || 'Solo de 2 a 4 caracteres'
      ]"
    ></v-text-field>
    <v-text-field
      v-model="formData.password"
      type="password"
      label="Contraseña"
      :rules="[(v) => !!v || 'Campo requerido', (v) => v.length >= 6 || 'Mínimo 6 caracteres']"
    ></v-text-field>
    <v-text-field
      v-model="formData.passwordConfirmation"
      type="password"
      label="Confirmar Contraseña"
      :rules="[
        (v) => !!v || 'Campo requerido',
        (v) => v.length >= 6 || 'Mínimo 6 caracteres',
        (v) => v === formData.password || 'Las contraseñas no coinciden'
      ]"
    ></v-text-field>
    <v-checkbox
      label="Acepto términos y condiciones"
      v-model="termsAndConditions"
      :rules="[(v) => !!v || 'Por favor, acepte los términos y condiciones']"
    ></v-checkbox>
    <!-- <br /> -->
    <!-- <v-alert v-model="alert" :type="alertData.type" closable>{{ alertData.message }}</v-alert> -->
    <!-- <br /> -->
    <v-dialog v-model="alert">
      <v-sheet class="pa-8 mx-auto" width="100%" max-width="800" elevation="2" rounded="xl">
        <h3 class="dialog_title">{{ alertData.title }}</h3>
        <div class="dialog_info">
          <p>{{ alertData.message }}</p>
        </div>
        <v-row>
          <v-spacer />
          <v-btn
            class="font-weight-bold text-h6"
            color="#384FFE"
            variant="text"
            @click="alert = false"
            >CERRAR</v-btn
          >
        </v-row>
      </v-sheet>
    </v-dialog>
    <v-btn class="text-body-1 submit text-capitalize" type="submit">Crear cuenta</v-btn>
  </v-form>
</template>

<style scoped>
.submit {
  color: white;
  font-weight: bold;
  background-color: var(--blue);
  width: 100%;
}

h1 {
  text-align: center;
  color: var(--blue);
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
