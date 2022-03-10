
<template>
  <div class="login">
    <h1>Identificate</h1>
    <form class="login__form">
      <CustomInput
          label="Email"
          placeholcer="Dime tu email"
          type="email"
          v-model="email"
      />
      <CustomInput
          label="Contraseña"
          placeholcer="¿Cual es tu contraseña?"
          type="password"
          v-model="password"
      />
      <CustomButton
          @do-click="login"
          type="submit"
          text="Entrar"
      />
    </form>
    <p>¿No tienes cuenta? <router-link :to="{ 'name': 'signup' }">Regístrate</router-link>.</p>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import NProgress from "nprogress"
import supabase from "@/mixins/supabase.js"

export default {
  name: 'LoginView',
  mixins: [supabase],
  data() {
    return {
      email: '',
      password: '',
    }
  },
  mounted() {
    // Alerta de si has sido registrado
    if (this.$route.query.signup) alert('Estas registrado!');
  },
  components: {
    CustomInput,
    CustomButton
  },
  methods: {
    login: async function () {
      NProgress.start()
      const { user, session, error } = await this.supabase.auth.signIn({
        email: this.email,
        password: this.password
      });
      if (user === null) {
        // Error
        alert(error.message);
      } else {
        // Logeado
        this.$router.push({name: 'home'});
      }
      NProgress.done()
      return session;
    }
  }
}
</script>
