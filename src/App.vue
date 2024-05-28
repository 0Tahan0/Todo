<template>
  <div class="h-full max-h-full select-none">
    <div class="container mx-auto h-full max-h-full">
      <the-nav></the-nav>

      <itemsCreator />

      <itemsView />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import itemsCreator from "@/components/views/itemsCreator";
import itemsView from "@/components/views/itemsView";
export default {
  components: {
    itemsCreator,
    itemsView,
  },
  data() {
    return {
      html: document.querySelector(":root"),
    };
  },
  computed: {
    ...mapState({
      language: "lang",
      mode: "mode",
      theme: "theme",
    }),
  },

  methods: {
    ...mapActions({
      changeMode: "changeMode",
    }),

    // system
    setLang() {
      if (this.language == "ar") {
        this.html.setAttribute("dir", "rtl");
        this.html.setAttribute("lang", "ar");
      } else {
        this.html.setAttribute("dir", "ltr");
        this.html.setAttribute("lang", "en");
      }
    },
    setMode() {
      this.html.setAttribute("data-mode", this.mode);
    },
    setTheme() {
      document
        .querySelector(":root")
        .style.setProperty("--mainColor", this.theme.value);
    },
  },
  watch: {
    //system watchers
    language() {
      this.setLang();
    },
    mode() {
      this.setMode();
    },
    theme() {
      this.setTheme();
    },
  },
  mounted() {
    this.setLang();
    this.setMode();
    this.setTheme();
  },
  beforeMount() {
    this.$store.dispatch("getData");
  },
};
</script>
