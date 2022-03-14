<template>
  <main>
    <router-view/>
    <nav class="nav">
      <ul>
        <li>
          <router-link :to="{ 'name': 'home' }">Home</router-link>
        </li>
        <li>
          <router-link :to="{ 'name': 'search' }">Buscar</router-link>
        </li>
        <li>
          <CustomButton
              text="Salir"
              @do-click="logout"
          />
        </li>
      </ul>
    </nav>
  </main>
</template>
<script>
import CustomButton from "@/components/CustomButton";
import supabase from "@/mixins/supabase";
import privateLogin from "@/mixins/private.js";

export default {
  name: 'App',
  mixins: [supabase, privateLogin],
  components: [
      CustomButton
  ],
  methods: {
    logout: async function () {
      await this.supabase.auth.signOut()
      this.checkLogin()
    },
  }
}
</script>