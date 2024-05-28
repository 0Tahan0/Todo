<template>
  <teleport to="body">
    <transition enter-to-class="slide-up" leave-to-class="slide-down">
      <div
        :class="blur ? 'backdrop-blur-sm' : ''"
        v-if="open"
        THEMODAL
        class="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center"
        style="z-index: 999999"
      >
        <!-- :class="slide ? 'slide-up' : fade ? 'fade' : ''" -->
        <the-card
          class="shadow-lg border dark:border-gray-700 flex flex-col justify-between"
          :class="customizeStyle"
          style="box-shadow: 0 0 100vmax 100vmax #0005, 0 0 10px 1px #0003"
        >
          <nav class="flex pb-2">
            <div>
              <button
                class="text-sm md:text-base active:scale-90"
                @click="$emit('close', false)"
              >
                <fs-icon :icon="['fas', 'close']"></fs-icon>
              </button>
              <button
                class="text-sm md:text-base active:scale-90 ms-4"
                @click="resize()"
              >
                <fs-icon
                  :icon="['fas', fullWidth ? 'compress' : 'expand']"
                ></fs-icon>
              </button>
            </div>
            <span class="ms-auto"><slot name="title"></slot></span>
          </nav>
          <div class="overflow-y-auto flex-grow">
            <slot></slot>
          </div>
          <footer>
            <slot name="footer" class="border"></slot>
          </footer>
        </the-card>
      </div>
    </transition>
  </teleport>
</template>
<script>
export default {
  data() {
    return {
      fullWidth: false,
    };
  },
  emits: ["close"],
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    blur: {
      type: Boolean,
      default: false,
    },

    slide: {
      type: Boolean,
      default: false,
    },
    full: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    resize() {
      this.fullWidth = !this.fullWidth;
    },
  },
  computed: {
    customizeStyle() {
      let cls = ``;
      if (this.slide) cls += " slide-up111";
      else cls += " fade111";
      if (this.fullWidth)
        cls +=
          "  max-h-full  max-w-full m-0 md:m-0 my-0 mx-0 md:my-0 md:mx-0 wide";
      else cls += "  narrow";
      return cls;
    },
  },
  watch: {
    open(val) {
      const body = document.body;
      const modals = body.querySelectorAll("[THEMODAL]");
      if (val) {
        body.setAttribute("noScroll", true);
      } else if (modals.length == 1) body.removeAttribute("noScroll");
    },
  },
};
</script>
