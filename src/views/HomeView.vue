<template>
  <div class="home">
    <h1>Hola, bienvenido a tu red</h1>
    <button @click="logout">Salir</button>
  </div>
</template>

<script>
//import NProgress from "nprogress"
import supabase from "@/mixins/supabase.js"
import privateLogin from "@/mixins/private.js";

export default {
  name: 'HomeView',
  mixins: [supabase, privateLogin],
  data() {
    return {
    }
  },
  mounted() {
  },
  components: {
  },
  methods: {
    logout: async function () {
      await this.supabase.auth.signOut()
      this.checkLogin()
    }
  }
}
</script>
