<template>
  <button
      class="button"
      :type="type"
  >{{ text }}</button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    text: String
  }
}
</script>