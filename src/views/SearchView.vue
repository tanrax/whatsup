<template>
  <div class="search">
<!--    <h1>Buscador</h1>-->
<!--    <p><router-link :to="{ 'name': 'home' }">Salir</router-link>.</p>-->
<!--    <form class="search__form">-->
<!--      <CustomInput-->
<!--          label="Buscador"-->
<!--          placeholcer="¿Qué quieres buscar?"-->
<!--          type="search"-->
<!--          v-model="search"-->
<!--      />-->
<!--      <CustomButton-->
<!--          @do-click=""-->
<!--          text="Buscar"-->
<!--      />-->
<!--    </form>-->
<!--    <div class="search__posts">-->
<!--      <SinglePost-->
<!--          v-for="(post, index) in posts"-->
<!--          :key="index"-->
<!--          :userName="getUserName(post.user_id)"-->
<!--          :date="getFormatDate(post.created_at)"-->
<!--          :id="post.id"-->
<!--          :message="post.text"-->
<!--          :is-my-post="isMyPost(post.user_id)"-->
<!--      />-->
<!--    </div>-->
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
