<template>
  <main>
    <router-view/>
    <nav class="nav">
      <ul class="nav__ul">
        <li
            v-if="$store.state.isLogin"
        >
          <router-link :to="{ 'name': 'home' }" class="button">Home</router-link>
        </li>
        <li
            v-if="$store.state.isLogin"
        >
          <router-link :to="{ 'name': 'search' }" class="button">Buscar</router-link>
        </li>
        <li>
          <CustomButton
              v-if="$store.state.isLogin"
              text="Salir"
              @do-click="logout"
          />
          <router-link
              v-else
              :to="{ 'name': 'login' }"
              class="button"
          >Login</router-link>
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
  components: {
      CustomButton
  },
  mounted: async function() {
    this.$store.state.isLogin = await this.isLogin();
  },
  methods: {
    logout: async function () {
      await this.supabase.auth.signOut()
      this.checkLogin()
      this.$store.state.isLogin = false;
    },

  }
}
</script>