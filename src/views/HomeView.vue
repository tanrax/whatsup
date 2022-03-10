<template>
  <div class="home">
    <h1>Hola, bienvenido a tu red</h1>
    <button @click="logout">Salir</button>
    <NewMessage :user-ID="myID" />
  </div>
</template>

<script>
//import NProgress from "nprogress"
import supabase from "@/mixins/supabase.js"
import privateLogin from "@/mixins/private.js";
import NewMessage from "@/components/NewMessage";

export default {
  name: 'HomeView',
  mixins: [supabase, privateLogin],
  data() {
    return {
      myID: ""
    }
  },
  async mounted() {
    this.myID = await this.supabase.auth.user().id;
  },
  components: {
    NewMessage
  },
  methods: {
    logout: async function () {
      await this.supabase.auth.signOut()
      this.checkLogin()
    }
  }
}
</script>
