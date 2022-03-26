<template>
  <div class="users-list">
    <h1>{{ getUserName($route.query.userId) }}</h1>
    <div class="user-list__posts">
      <SinglePost
          v-for="(post, index) in posts"
          :key="index"
          :userName="getUserName(post.user_id)"
          :date="getFormatDate(post.created_at)"
          :id="post.id"
          :message="post.text"
          :is-my-post="isMyPost(post.user_id)"
      />
      <h2 v-if="posts.length === 0">No hay mensajes</h2>
    </div>
    <NewMessage :user-ID="myID" :is-public="false" :target-user="$route.query.userId" />
  </div>
</template>

<script>
import supabase from "@/mixins/supabase.js"
// Components
import NewMessage from "@/components/NewMessage";
import SinglePost from "@/components/SinglePost";
import {formatRelative} from "date-fns";
import {es} from "date-fns/locale";

export default {
  name: 'PrivateChat',
  mixins: [supabase],
  data() {
    return {
      myID: '',
      posts: []
    }
  },
  async mounted() {
    this.myID = await this.supabase.auth.user().id;
    this.getMessages();
    this.refrescoAutomaticoMensajes();
  },
  components: {
    NewMessage,
    SinglePost
  },
  methods: {
    getUserName: function (userId) {
      return this.$store.state.profiles
          .filter(profile => profile.user_id === userId)[0]?.name;
    },
    getMessages: async function () {
      const { data, error } = await this.supabase
          .from('social_network-posts')
          .select('*')
          .or(`user_id.eq.${this.myID},user_id.eq.${this.$route.query.userId}`)
          .or(`user_target.eq.${this.myID},user_target.eq.${this.$route.query.userId}`)
          .order('created_at', { ascending: true })
          .eq('is_public', false)
      // Errores
      if (error) {
        alert(error.message);
      } else {
        this.posts = data;
      }
    },
    getFormatDate: function (date) {
      return formatRelative(new Date(date), new Date(), { locale: es });
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
  }
}
</script>
