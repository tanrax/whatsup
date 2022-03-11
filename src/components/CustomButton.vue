<template>
  <button
      class="button"
      :type="type"
      @click.prevent="$emit('doClick')"
      :disabled="buttonDisabled"
  >{{ text }}</button>
</template>

<script>
export default {
  name: 'CustomButton',
  emits: [ "doClick" ],
  props: {
    type: {
      type: String,
      default: 'button'
    },
    text: String,
    buttonDisabled: {
      type: Boolean,
      default: false,
    }
  }
}
</script>