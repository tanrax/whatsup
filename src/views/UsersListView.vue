<template>
  <div class="users-list">
    <h1>Usuarios</h1>
    <ul class="users-list__ul">
      <li
          v-for="user in $store.state.profiles"
          v-bind:key="user.id"
          class="users-list__li"
      >
        <router-link
            :to="{ 'name': 'privateChat', query: {'userId': user.user_id} }"
            class="button users-list__link"
        >{{ user.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import supabase from "@/mixins/supabase.js"

export default {
  name: 'UsersListView',
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
