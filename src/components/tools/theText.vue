<template>
  <p v-if="lang == 'en'" v-html="en"></p>
  <p v-else v-html="ar"></p>
</template>
<script>
export default {
  props: {
    en: {
      type: String,
      default: "",
    },
    ar: {
      type: String,
      default: "",
    },
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },
};
</script>
