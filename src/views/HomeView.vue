<template>
  <div class="home container-padding">
    <h1>Hola, bienvenido a tu red</h1>
    <CustomButton
      text="Salir"
      @do-click="logout"
    />
    <div class="home__posts">
      <SinglePost
        v-for="(post, index) in posts"
        :key="index"
        :message="post.text"
        :is-my-post="isMyPost(post.user_id)"
      />
    </div>
    <NewMessage :user-ID="myID" />
  </div>
</template>

<script>
//import NProgress from "nprogress"
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
      posts: []
    }
  },
  async mounted() {
    this.myID = await this.supabase.auth.user().id;
    this.getMessages();
  },
  components: {
    NewMessage,
    SinglePost,
    CustomButton
  },
  methods: {
    logout: async function () {
      await this.supabase.auth.signOut()
      this.checkLogin()
    },
    getMessages: async function () {
      const { data, error } = await this.supabase
        .from('social_network-posts')
        .select("*");
      if (error) {
        alert(error.message);
      } else {
        this.posts = data;
      }
    },
    getUsers: async function () {
      const { data, error } = await this.supabase
        .from('social_network-profile')
        .select("name, user_id");
      if (error) {
        alert(error.message);
      } else {
        console.log(data);
      }
    },
    isMyPost: function (postOwnerID) {
      return this.myID === postOwnerID;
    }
  }
}
</script>
