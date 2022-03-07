<template>
  <div class="signup">
    <h1>Registro</h1>
    <section>
      <form class="signup__form">
        <label class="signup__label">
          Email
          <input class="signup__input" type="email" name="email" placeholder="Tu correo...">
          <span class="signup__error">No contiene un formato valido</span>
        </label>
        <label class="signup__label">
          Nombre
          <input class="signup__input" type="text" name="nombre" placeholder="Tu nombre...">
          <span class="signup__error">Campo obligatorio</span>
        </label>
        <label class="signup__label">
          Contraseña
          <input class="signup__input" type="password" name="password">
        </label>
        <label class="signup__label">
          Repìte tu contraseña
          <input class="signup__input" type="password" name="password-repeat">
          <span class="signup__error">Las contraseñas son obligatorias y deben coincidir</span>
        </label>
        <p>
          <input class="signup__input" type="submit" value="Registrarme">
        </p>
      </form>
    </section>
    <section>
      <p>
        <router-link :to="{ 'name': 'login' }">Identificarme</router-link>.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'SignupView',
  components: {
  }
}
</script>
