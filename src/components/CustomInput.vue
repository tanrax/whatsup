<template>
  <div class="input">
    <label class="input__label">
      {{ label }}
      <input
          class="input__field"
          :type="type"
          :placeholder="placeholcer"
          :value="value"
          :class="{ 'input__error': showErrors }"
      >
    </label>
    <ul v-if="showErrors" class="input__errors">
      <li v-for="(error, key) in errorsList" v-bind:key="key">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    type: String,
    placeholcer: String,
    label: String,
    showErrors: Boolean,
    errorsList: Array,
    value: String
  }
}
</script>