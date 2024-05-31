<template>
  <the-card>
    <the-button @click="showCreator = !showCreator">
      <the-text en="create an item ?" ar="إنشاء عنصر ؟" />
    </the-button>
    <transition enter-to-class="enter" leave-to-class="leave">
      <div v-show="showCreator">
        <div class="flex mt-2 justify-between flex-wrap items-center">
          <the-card
            class="mx-2 md:mx-5 border dark:border-gray-700 max-h-full overflow-y-auto w-full overflow-x-hidden"
          >
            <textarea
              :placeholder="setText('العنوان', 'The title')"
              type="text"
              maxlength="20"
              v-model="item.title"
              class="outline-none resize-none bg-transparent text-xs md:text-sm ms-2 w-full text-primary capitalize"
            ></textarea>
            <textarea
              :placeholder="setText('الشرح', 'The description')"
              type="text"
              v-model="item.desc"
              rows="3"
              class="outline-none resize-none bg-transparent text-xs md:text-sm ms-2 w-full leading-3"
            ></textarea>

            <the-text
              :en="item.type.en"
              :ar="item.type.ar"
              class="bg-primary p-2 w-fit rounded-tl-3xl rounded-br-3xl capitalize text-xs md:text-base font-bold text-white"
            />
            <!-- <the-text en="type" ar="النوع" /> -->
          </the-card>
        </div>

        <div class="mt-3">
          <the-text en="select the type" ar="تحديد النوع" />
          <div class="mt-2 grid grid-cols-4 gap-5">
            <div
              v-for="tp in types"
              :key="tp.en"
              @click="selectType(tp)"
              :class="
                tp.en == item.type.en
                  ? 'ring ring-primary'
                  : 'hover:ring-1 hover:ring-primary'
              "
              class="text-center col-span-2 md:col-span-1 shadow-md border dark:border-gray-700 rounded-md md:p-10 p-10 cursor-pointer active:scale-95 transition"
            >
              <the-text :en="tp.en" :ar="tp.ar" />
            </div>
          </div>
        </div>
        <the-button
          class="mt-5 ms-auto block w-full md:w-fit"
          @click="createItem"
        >
          <the-text en="create" ar="إنشاء" />
        </the-button>
      </div>
    </transition>
  </the-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      showCreator: false,
      item: {
        title: "",
        desc: "",
        type: {
          en: "homework",
          ar: "منزلي",
        },
      },

      types: [
        {
          ar: "منزلي",
          en: "homework",
        },
        {
          ar: "أعمال",
          en: "business",
        },
        {
          ar: "أكاديمي",
          en: "academic",
        },
        {
          ar: "عطلة",
          en: "vacation",
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      setNewItem: "setItem",
    }),
    setText(ar, en) {
      if (this.$store.state.lang == "ar") return ar;
      return en;
    },
    selectType(tp) {
      this.item.type.en = tp.en;
      this.item.type.ar = tp.ar;
    },
    createItem() {
      if (this.item.title.trim() != "") {
        this.setNewItem(this.item);
        this.item = {
          title: "",
          desc: "",
          type: {
            en: "homework",
            ar: "منزلي",
          },
        };
      }
    },
  },
};
</script>
