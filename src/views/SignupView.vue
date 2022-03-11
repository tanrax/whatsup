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
            @do-click="validar"
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
import NProgress from "nprogress"
import supabase from "@/mixins/supabase.js"

const limitNombre = 4;

export default {
  name: 'SignupView',
  mounted() {
  },
  mixins: [supabase],
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
        // Save data
        this.createUser();
      }
    },
    createUser: async function () {
      NProgress.start();
      const { user, session, error } = await this.supabase.auth.signUp({
        email: this.email,
        password: this.password,
      })
      if (user === null) {
        // Supabase devuelve un error
        alert(error.message);
      } else {
        // Guardamos el nombre
        await this.supabase
            .from('social_network-profile')
            .insert([
              { name: this.nombre, user_id: session.user.id }
            ])
        // Cambiamos a la vista de Login
        this.$router.push({name: 'login', query: {signup: true}});
      }
      NProgress.done()
      return session;
    }
  }
}
</script>
