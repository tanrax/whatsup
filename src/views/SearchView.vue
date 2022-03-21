<template>
  <div class="search">
    <h1>Buscador</h1>
    <form class="search__form">
      <CustomInput
          label="Buscador"
          placeholcer="¿Qué quieres buscar?"
          type="search"
          v-model="search"
      />
      <CustomButton
          @do-click="buscar"
          text="Buscar"
      />
    </form>
    <div class="search__posts">
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
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import SinglePost from "@/components/SinglePost";
//import NProgress from "nprogress"
import supabase from "@/mixins/supabase.js"

export default {
  name: 'SearchView',
  mixins: [supabase],
  data() {
    return {
      search: ''
    }
  },
  mounted() {
  },
  components: {
    CustomInput,
    CustomButton,
    SinglePost
  },
  methods: {
    buscar: function () {
      return true;
    }
  }
}
</script>
