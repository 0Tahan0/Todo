<template>
  <the-button
    class="p-1 w-fit relative min-w-20 m-1"
    @click="open = !open"
    :style="open ? 'z-index:51 ' : ''"
  >
    <div class="flex justify-between items-center">
      <!-- <slot #title></slot> -->
      <span ref="title" class="mx-0.5">
        <span v-if="title != ''">{{ title }}</span>
        <slot v-else name="title"></slot>
      </span>
      <fs-icon
        :icon="['fas', 'angle-down']"
        class="transition"
        :class="open ? 'rotate-180' : ''"
      />
    </div>
    <transition enter-active-class="fade" leave-active-class="fade-out">
      <the-card
        v-show="open"
        class="absolute left-0 -bottom-2 translate-y-full min-w-full w-fit max-h-36 overflow-y-auto border dark:border-gray-700 px-0.5 py-0.5 md:px-0.5 md:py-0.5 z-50"
      >
        <div ref="content">
          <slot></slot>
        </div>
      </the-card>
    </transition>
  </the-button>
</template>
<script>
export default {
  emits: ["change", "update:modelValue"],
  props: {
    modelValue: {},
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    selectItem(el) {
      const title = this.$refs.title;
      title.textContent = el.textContent;
      this.$emit("change", el.value);
      this.$emit("update:modelValue", el.value);
    },
  },
  mounted() {
    const content = this.$refs.content;
    const title = this.$refs.title;
    const options = content.querySelectorAll("option");
    if (options.length != 0) {
      if (title.textContent == "" && this.title == "")
        title.textContent = options[0].textContent;
      options.forEach((op) => {
        op.className = `px-0.5 py-1 text-xs md:text-sm  hover:bg-primary text-black dark:text-white hover:text-white cursor-pointer`;
        op.addEventListener("click", () => this.selectItem(op));
      });
    }
  },
  watch: {
    open(val) {
      if (val) {
        const element = this.$el;
        document.addEventListener("click", (event) => {
          if (!element.contains(event.target)) this.open = false;
        });
      }
    },
  },
};
</script>
<style>
::-webkit-scrollbar {
  width: 2px;
  height: 1px;
}
</style>
