<template>
  <div class="users-list">
    <h1>Estas hablando con...</h1>
  </div>
</template>

<script>
import supabase from "@/mixins/supabase.js"

export default {
  name: 'PrivateChat',
  mixins: [supabase],
  data() {
    return {
    }
  },
  mounted() {
  },
  components: {
  },
  methods: {
  }
}
</script>
