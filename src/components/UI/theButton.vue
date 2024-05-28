<template>
  <button
    :disabled="disabled"
    class="shadow-md py-1 px-2 capitalize text-xs md:text-sm transition"
    :class="isDisabled"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isDisabled() {
      if (this.disabled) {
        return "bg-gray-300 dark:bg-gray-600 text-gray-400 ";
      }
      return "bg-primary text-white md:active:bg-primary  md:hover:scale-105 ring-primary dark:ring-offset-dark ring-offset-1 active:ring-2 active:scale-90 ";
    },
  },
};
</script>
