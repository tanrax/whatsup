<template>
  <div>
    <form>
      <CustomTextarea
          placeholcer="Nuevo mensaje.."
          v-model="message"
          />
      <CustomButton
        @click.prevent=""
        type="submit"
        text="Publicar"
        />
    </form>
    {{ message }}
  </div>
</template>

<script>
import CustomTextarea from "@/components/CustomTextarea";
import CustomButton from "@/components/CustomButton";

export default {
  name: 'NewMessage',
  data() {
    return {
      message: ''
    }
  },
  components: {
    CustomTextarea,
    CustomButton
  }
}
</script>