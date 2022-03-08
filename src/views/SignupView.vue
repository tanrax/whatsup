<template>
  <div class="signup">
    <h1>Registro</h1>
    <section>
      <form class="signup__form">
        <CustomInput
            label="Nombre"
            placeholcer="Dime tu nombre"
            type="text"
            v-model="nombre"
            :showErrors="nombreError"
            :errorsList="['El nombre debe tener más de 4 caracteres']"
        />
        <CustomInput
            label="Email"
            placeholcer="Dime tu email"
            type="email"
            :showErrors="emailError"
            v-model="email"
            :errorsList="['Email obligatorio', 'No contiene un formato válido']"
        />
        <CustomInput
            label="Contraseña"
            placeholcer="Escribe una clave dificil"
            type="password"
            :showErrors="passwordError"
            v-model="password"
            :errorsList="['Contraseña obligatoria', 'Las constraseñas no son igual']"
        />
        <CustomInput
            label="Repite contraseña"
            placeholcer="Repite contraseña"
            type="password"
            :showErrors="passwordError"
            v-model="password2"
        />
        <CustomButton
            @click.prevent="validar"
            type="submit"
            text="Registrarme"
        />
      </form>
    </section>
    <section>
      <p>
        <router-link :to="{ 'name': 'login' }">Identificarme</router-link>.
      </p>
    </section>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

const limitNombre = 4;

export default {
  name: 'SignupView',
  data() {
   return {
     nombre: '',
     nombreError: false,
     email: '',
     emailError: false,
     password: '',
     password2: '',
     passwordError: false
   }
  },
  components: {
    CustomInput,
    CustomButton
  },
  methods: {
    validar: function () {
      // Limpiar viejas validaciones
      this.nombreError = false;
      this.emailError = false;
      this.passwordError = false;

      // Nombre
      // Limite de caracteres a limitNombre
      if (this.nombre.trim().length < limitNombre) {
        this.nombreError = true;
      }

      // Email
      if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)) {
        this.emailError = true;
      }

      // Password
      if (this.password.trim().length === 0 || this.password != this.password2) {
        this.passwordError = true;
      }

      if (!this.nombreError &&
          !this.emailError &&
          !this.passwordError
      ) {
        alert('Todo bien')
      }
    }
  }
}
</script>
