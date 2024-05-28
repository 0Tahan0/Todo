<template>
  <the-card
    :type="setText(info.type.ar, info.type.en)"
    class="item flex min-h-32 p-0 md:p-0 px-2 md:px-2 relative before:absolute before:top-0 before:w-fit before:p-1 before:capitalize before:h-fit before:text-white"
    :class="
      info.type.en == 'homework'
        ? 'before:bg-blue-500'
        : info.type.en == 'business'
        ? 'before:bg-red-500'
        : info.type.en == 'vacation'
        ? 'before:bg-green-500'
        : info.type.en == 'academic'
        ? 'before:bg-purple-500'
        : ''
    "
  >
    <div class="md:w-28 w-24 py-2 md:py-3 flex flex-col justify-evenly">
      <p class="text-sm md:text-md text-primary capitalize">
        {{ info.title }}
      </p>

      <sub
        class="text-gray-500 font-medium -mb-4"
        style="font-size: calc(8px + 0.4vw)"
        >{{ info.date }}</sub
      >
    </div>
    <div class="relative overflow-hidden flex-grow">
      <div
        class="border-0 p-2 shadow-none m-0 desc z-10 transition max-w-full w-full max-h-full h-full absolute top-0 left-0"
        :class="showDesc ? 'translate-y-0' : 'translate-y-full'"
      >
        <the-button
          :disabled="info.desc.length == 0"
          @click="showDesc = true"
          class="absolute text-sm top-0 left-1/2 -translate-y-full rounded-full w-5 h-5"
        >
          <span
            :toolTip="setText('عرض التفاصيل', 'show the description')"
            toolTipTop
            class="flex justify-center items-center text-xs"
          >
            <!-- <the-text
              class="whitespace-nowrap text-center"
              en="description"
              ar="الشرح"
            /> -->
            <fs-icon :icon="['fas', 'angle-up']"></fs-icon>
          </span>
        </the-button>
        <p
          class="h-full overflow-y-auto text-xs md:text-base leading-5 whitespace-pre-line break-words"
          style="height: 95%"
        >
          {{ info.desc }}
        </p>
        <the-button
          @click="showDesc = false"
          class="absolute text-sm bottom-0 left-1/2 rounded-full w-5 h-5"
        >
          <span
            :toolTip="setText('إخفاء', 'hide')"
            toolTipTop
            class="flex justify-center items-center text-xs"
          >
            <!-- <the-text
              class="whitespace-nowrap text-center"
              en="hide"
              ar="إخفاء"
            /> -->
            <fs-icon :icon="['fas', 'angle-down']"></fs-icon>
          </span>
        </the-button>
      </div>
    </div>
    <div
      class="py-2 md:py-3 flex flex-col justify-evenly max-w-24 md:max-w-32 md:w-32"
    >
      <div class="flex items-center justify-evenly text-sm md:text-base">
        <button
          @click="$emit('edit', info.id)"
          class="text-primary active:scale-95"
          :toolTip="setText('تعديل', 'edit')"
          toolTipRight
        >
          <fs-icon :icon="['fas', 'pen']" />
        </button>
        <button
          @click="$emit('delete', { value: info.id, target: this.$el })"
          class="text-primary ms-4 active:scale-95"
          :toolTip="setText('حذف', 'delete')"
          toolTipTop
        >
          <fs-icon :icon="['fas', 'trash']" />
        </button>
      </div>
      <!-- p-2 active:scale-95 border text-gray-800 shadow-none active:ring-2 rounded-md1 ring-primary ring-offset-1  bg-transparent md:hover:bg-primary md:hover:text-white dark:text-white active:bg-primary active:text-white  -->
      <the-button
        @click="$emit('complete', info.id)"
        class="flex items-center justify-between -mb-6 text-xs"
        :class="
          info.completed
            ? ' '
            : 'bg-transparent ring-1 ring-offset-0 ring-inset dark:ring-gray-700 ring-gray-200'
        "
      >
        <span
          class="text-xs"
          v-text="
            info.completed
              ? setText('تم الإنجاز', 'completed')
              : setText('غير منجز', 'incompleted')
          "
          :class="
            info.completed
              ? 'text-white'
              : mode == 'dark'
              ? 'text-white '
              : 'text-black'
          "
        ></span>

        <fs-icon
          :class="info.completed ? 'text-green-500' : 'text-sky-500'"
          :icon="['fas', info.completed ? 'check-circle' : 'hourglass']"
          fixedWidth
          :bounce="info.completed"
          :pulse="!info.completed"
        />
      </the-button>
    </div>
  </the-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  emits: ["delete", "edit", "complete"],
  props: ["info"],
  data() {
    return {
      showDesc: false,
    };
  },
  computed: {
    ...mapState({
      lang: "lang",
      mode: "mode",
    }),
    // lang() {
    //   return this.$store.state.lang;
    // },
  },
  methods: {
    setText(ar, en) {
      if (this.lang == "ar") return ar;
      return en;
    },
  },
};
</script>
<style scoped>
.item::before {
  content: attr(type);
  font-size: 10px;
  border-radius: 50% 0 50% 0;
}
::-webkit-scrollbar {
  width: 3px;
  height: 0;
}
::-webkit-scrollbar-thumb {
  border-radius: 100vmax;
  background: #999;
}
</style>
