<template>
  <div>
    <form>
      <CustomTextarea
          placeholcer="Nuevo mensaje.."
          v-model="message"
          />
      <CustomButton
        @do-click="sendMessage"
        type="submit"
        text="Publicar"
        :button-disabled="disableSend"
      />
    </form>
  </div>
</template>

<script>
// components
import CustomTextarea from "@/components/CustomTextarea";
import CustomButton from "@/components/CustomButton";

// mixins
import supabase from "@/mixins/supabase.js"

export default {
  name: 'NewMessage',
  data() {
    return {
      message: '',
    }
  },
  components: {
    CustomTextarea,
    CustomButton
  },
  props: {
    userID: String,
  },
  mixins: [supabase],
  computed: {
    disableSend: function () {
      return this.message.length === 0;
    }
  },
  methods: {
    sendMessage: async function () {
      const { error } = await this.supabase
        .from('social_network-posts')
        .insert([
          { user_id: this.userID, text: this.message },
        ]);
      if (error) {
        alert(error.message);
      } else {
        this.message = "";
      }
    }
  }
}
</script>