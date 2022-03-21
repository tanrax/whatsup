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
          :date="post.created_at"
          :id="post.id"
          :message="post.text"
      />
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import SinglePost from "@/components/SinglePost";
import supabase from "@/mixins/supabase.js"

export default {
  name: 'SearchView',
  mixins: [supabase],
  data() {
    return {
      search: '',
      posts: []
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
    buscar: async function () {
      const { data} = await this.supabase
          .from('social_network-posts')
          .select('text')
          .ilike('text', `%${this.search}%`)
      this.posts = data;
    }
  }
}
</script>
