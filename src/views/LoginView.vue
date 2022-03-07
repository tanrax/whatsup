<template>
  <div class="login">
    <h1>Identificate</h1>
    <p>¿No tienes cuenta? <router-link :to="{ 'name': 'signup' }">Regístrate</router-link>.</p>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  components: {
  }
}
</script>
