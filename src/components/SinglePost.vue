<template>
    <article class="single-post" :class="{ 'my': isMyPost }">
      <header class="single-post__header">
        <p class="text-semi-bold">{{ userName }}</p>
        <p class="text-s">{{ date }}</p>
      </header>
      <p class="single-post__content">{{ message }}</p>
      <CustomButton
        v-if="isMyPost"
        text="Borrar"
      />
    </article>
</template>

<script>
import CustomButton from "@/components/CustomButton";

export default {
  name: 'SinglePost',
  components: { CustomButton },
  props: {
    userName: String,
    date: String,
    message: String,
    isMyPost: Boolean
  }
}
</script>