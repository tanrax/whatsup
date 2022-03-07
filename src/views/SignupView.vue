<template>
  <div class="signup">
    <h1>Registro</h1>
    <section>
      <form class="signup__form">
        <CustomInput
            label="Nombre"
            placeholcer="Dime tu nombre"
            type="text"
            :showErrors="true"
            :errorsList="['Nombre obligatorio']"
        />
        <CustomInput label="Email" placeholcer="Dime tu email" type="email" />
        <CustomInput label="Contraseña" type="password" />
        <CustomInput label="Repite contraseña" type="password" />
        <CustomInput type="submit" value="Registrarme" />
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
import CustomInput from "@/components/CustomInput";

export default {
  name: 'SignupView',
  components: {
    CustomInput
  }
}
</script>
