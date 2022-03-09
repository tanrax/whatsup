<template>
  <div class="input">
    <label class="input__label">
      {{ label }}
      <textarea
          class="input__field input__field--textarea"
          :placeholder="placeholcer"
          :class="{ 'input__error': showErrors }"
          @input="$emit('update:modelValue', $event.target.value)"
          v-text="modelValue"
      ></textarea>
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
    placeholcer: String,
    label: String,
    showErrors: Boolean,
    errorsList: Array,
    modelValue: String,
  }
}
</script>