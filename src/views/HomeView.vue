<template>
  <div class="home">
    <h1>Hola, bienvenido a tu red</h1>
    <!-- Mensajes -->
    <div class="home__posts">
      <SinglePost
        v-for="(post, index) in posts"
        :key="index"
        :userName="getUserName(post.user_id)"
        :date="getFormatDate(post.created_at)"
        :id="post.id"
        :message="post.text"
        :is-my-post="isMyPost(post.user_id)"
      />
    </div>
    <!-- Paginador -->
    <CustomButton
        @do-click="page = page - 1"
        text="Atras"
        v-if="page != 1"
    />
    <CustomButton
        @do-click="page = page + 1"
        text="Siguiente"
        v-if="page < getLastPage()"
    />
    <!-- Nuevo mensaje -->
    <NewMessage :user-ID="myID" />
  </div>
</template>

<script>
//import NProgress from "nprogress"
import { formatRelative } from 'date-fns'
import { es } from 'date-fns/locale'

// mixin
import supabase from "@/mixins/supabase.js"
import privateLogin from "@/mixins/private.js";

// componennts
import NewMessage from "@/components/NewMessage";
import SinglePost from "@/components/SinglePost";
import CustomButton from "@/components/CustomButton";

export default {
  name: 'HomeView',
  mixins: [supabase, privateLogin],
  data() {
    return {
      myID: "",
      userName: "",
      posts: [],
      numMessagePage: 5,
      page: 1,
      countMessages: 0
    }
  },
  async mounted() {
    this.myID = await this.supabase.auth.user().id;
    this.getMessages();
    this.refrescoAutomaticoMensajes();
  },
  components: {
    NewMessage,
    SinglePost,
    CustomButton
  },
  methods: {
    getFormatDate: function (date) {
      return formatRelative(new Date(date), new Date(), { locale: es });
    },
    getUserName: function (userId) {
      return this.$store.state.profiles
          .filter(profile => profile.user_id === userId)[0]?.name;
    },
    getLastPage: function () {

      return Math.ceil(this.countMessages / this.numMessagePage);
    },
    getCountMessages: async function () {
      const { data, error } = await this.supabase
          .from('social_network-posts')
          .select("*");
      if (error) {
        alert(error.message);
      } else {
        this.countMessages = data.length;
      }
    },
    getMessages: async function () {
      const start = (this.page - 1) * this.numMessagePage;
      const end = start + this.numMessagePage - 1;
      const { data, error } = await this.supabase
        .from('social_network-posts')
        .select('*')
        .order('created_at', { ascending: false })
        .range(start, end);
      // Obtiene la cuenta de mensajes sin rangos
      this.getCountMessages();
      // Errores
      if (error) {
        alert(error.message);
      } else {
        this.posts = data;
      }
    },
    isMyPost: function (postOwnerID) {
      return this.myID === postOwnerID;
    },
    refrescoAutomaticoMensajes: function () {
      this.supabase
          .from('social_network-posts')
          .on('*', () => {
            this.getMessages();
          })
          .subscribe()
    }
  },
  watch: {
    page: function () {
      this.getMessages();
    }
  }
}
</script>
