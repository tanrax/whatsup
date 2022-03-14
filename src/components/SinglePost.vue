<template>
    <article v-if="isShow" class="single-post" :class="{ 'my': isMyPost }">
      <header class="single-post__header">
        <p class="text-semi-bold">{{ userName }}</p>
        <p class="text-s">{{ date }}</p>
      </header>
      <p class="single-post__content">{{ message }}</p>
      <CustomButton
        v-if="isMyPost"
        text="Borrar"
        @do-click="borrarMensaje"
      />
    </article>
</template>

<script>
import CustomButton from "@/components/CustomButton";
import supabase from "@/mixins/supabase";

export default {
  name: 'SinglePost',
  components: { CustomButton },
  mixins: [supabase],
  data: function () {
    return {
      isShow: true
    }
  },
  props: {
    id: Number,
    userName: String,
    date: String,
    message: String,
    isMyPost: Boolean
  },
  methods: {
    borrarMensaje: async function () {
      // Ocultamos el mensaje
      this.isShow = false;
      // Lo borramos de la base de datos
      const { data, error } = await this.supabase
          .from('social_network-posts')
          .delete()
          .eq('id', this.id)
      if (error) {
        alert(error);
      }
      return data;
    }
  }
}
</script>