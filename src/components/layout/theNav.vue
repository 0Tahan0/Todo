<template>
  <the-card class="flex items-center">
    <the-button
      :toolTip="
        mode == 'dark'
          ? setText('الوضع المظلم', 'dark mode')
          : setText('الوضع الداكن', 'light mode')
      "
      class="rounded-full text-center p-0.1 text-md w-8 h-8"
      @click="changeMode()"
    >
      <fs-icon :icon="['fas', mode == 'dark' ? 'moon' : 'sun']" />
    </the-button>
    <the-button
      :toolTip="setText('تغيير اللغة', 'change language')"
      class="rounded-full text-center p-0.1 text-md w-8 h-8 ms-2"
      @click="changeLang()"
    >
      <fs-icon :icon="['fas', 'language']" />
    </the-button>

    <the-select
      @change="changeTheme(JSON.parse($event))"
      :title="setText(theme.name.ar, theme.name.en)"
    >
      <option
        v-for="col in colors"
        :key="col.value"
        :value="JSON.stringify(col)"
        :style="`background-color:${col.value}`"
        v-text="setText(col.name.ar, col.name.en)"
      ></option>
      <!-- :class="col.name.en == theme.name.en ? 'font-bold text-xl' : 'text-xs'" -->
      <div :style="`background-color:${custom.value}`">
        <button
          class="p-1"
          v-text="setText(custom.name.ar, custom.name.en)"
          @click="openColor()"
        ></button>
        <input
          ref="customColorInput"
          type="color"
          value="333"
          v-model="custom.value"
          class="hidden"
        />
      </div>
    </the-select>
  </the-card>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      colors: [
        { value: "#f05", name: { en: "rose", ar: "روز" } },
        { value: "#5f5", name: { en: "green", ar: "أخضر" } },
        { value: "#91f", name: { en: "purple", ar: "أرجواني" } },
        { value: "#09f", name: { en: "blue", ar: "أزرق" } },
        { value: "#f33", name: { en: "red", ar: "أحمر" } },
        { value: "#555", name: { en: "black", ar: "أسود" } },
      ],

      custom: { value: "#333", name: { en: "custom", ar: "مخصص" } },
    };
  },
  computed: {
    ...mapState(["mode", "lang", "theme"]),
  },

  methods: {
    ...mapActions(["changeMode", "changeLang", "changeTheme"]),
    setText(ar, en) {
      if (this.lang == "ar") return ar;
      return en;
    },
    openColor() {
      this.$refs.customColorInput.click();
    },
  },
  watch: {
    "custom.value"() {
      this.changeTheme(this.custom);
    },
  },
};
</script>
