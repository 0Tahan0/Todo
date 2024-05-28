<template>
  <div class="max-h-full flex flex-col">
    <the-card class="sticky top-0 left-0 z-50">
      <the-text en="filter search" ar="تصفية البحث" />
      <div class="flex flex-wrap items-start">
        <the-select
          v-model="filters.completed"
          :title="setText('المنجزة و غير المنجزة', 'completed and incompleted')"
        >
          <option value="all">
            <the-text
              en="completed and incompleted"
              ar="المنجزة و غير المنجزة"
            />
          </option>
          <option value="false">
            <the-text en="incompleted" ar="غير المنجزة" />
          </option>
          <option value="true">
            <the-text en="completed" ar="المنجزة" />
          </option>
        </the-select>
        <the-select v-model="filters.date" :title="setText('الأحدث', 'newest')">
          <option value="newest">
            <the-text en="newest" ar="الأحدث" />
          </option>
          <option value="oldest">
            <the-text en="oldest" ar="الأقدم" />
          </option>
        </the-select>
        <the-select
          class="flex flex-col w-32 text-xs md:text-sm"
          :title="setText('كل العناصر', 'all items')"
        >
          <div class="flex flex-col dark:text-white text-black" typeOption>
            <label
              for="_hm"
              class="flex justify-between items-center cursor-pointer hover:bg-primary p-1"
              ><the-text en="homework" ar="منزلي" />
              <checkBox v-model="filters.type" value="homework" id="_hm" />
            </label>

            <label
              for="_bs"
              class="flex justify-between items-center cursor-pointer hover:bg-primary p-1"
              ><the-text en="business" ar="عمل" />
              <checkBox v-model="filters.type" value="business" id="_bs" />
            </label>

            <label
              for="_vc"
              class="flex justify-between items-center cursor-pointer hover:bg-primary p-1"
              ><the-text en="vacation" ar="عطلة" />
              <checkBox v-model="filters.type" value="vacation" id="_vc" />
            </label>

            <label
              for="_ac"
              class="flex justify-between items-center cursor-pointer hover:bg-primary p-1"
              ><the-text en="academic" ar="أكاديمي" />
              <checkBox v-model="filters.type" value="academic" id="_ac" />
            </label>
          </div>
        </the-select>
      </div>
      <div>
        <div class="text-xs md:text-sm space-y-5 flex flex-col mt-3">
          <div class="flex items-center">
            <the-text en="the types" ar="الأنواع" />
            <div class="flex flex-grow items-center flex-wrap gap-4 ms-5">
              <transition-group
                enter-active-class="enter"
                leave-active-class="leave"
              >
                <button
                  class="active:scale-95 active:bg-primary active:text-white md:hover:bg-primary md:hover:text-white md:hover:ring ring-offset-2 dark:ring-offset-dark flex items-center rounded-full ring-primary ring-1 p-0.5 text-primary w-fit bg-transparent capitalize"
                  v-for="f in selectedTypes"
                  :key="f"
                  @click="
                    filters.type = filters.type.filter((tp) => tp != f.en)
                  "
                >
                  <fs-icon :icon="['fas', 'close']"></fs-icon>
                  <the-text :en="f.en" :ar="f.ar" class="ms-2" />
                </button>
              </transition-group>
            </div>
          </div>
          <div class="flex items-center justify-between gap-5">
            <!-- <the-text en="search" ar="بحث" /> -->
            <div
              class="rounded p-2 ring-1 ring-primary flex-grow flex items-center"
            >
              <fs-icon :icon="['fas', 'search']" class="text-gray-400 px-1" />
              <input
                type="text"
                :placeholder="setText('بحث', 'search')"
                class="outline-none bg-transparent placeholder:text-gray-400 flex-grow"
                v-model="search"
              />
            </div>

            <transition enterActiveClass="enter" leave-active-class="leave">
              <the-button
                v-if="filteredData.length > 1"
                class=""
                @click="delAll_modal = true"
                ><the-text en="delete all results" ar="حذف جميع النتائج"
              /></the-button>
            </transition>
          </div>
        </div>
      </div>
      <div class="mt-2">
        <span class="bg-primary p-1 rounded-full text-sm"
          >{{ filteredData.length }}/{{ items.length }}</span
        >
      </div>
    </the-card>

    <div class="overflow-y-auto flex-grow max-h-full">
      <!-- <transition name="view"> -->
      <transition name="view">
        <div v-if="filteredData.length > 0">
          <the-item
            class="enter"
            v-for="item in filteredData"
            :key="item"
            :info="item"
            @delete="deleteItem($event)"
            @edit="editItem"
            @complete="completeItem"
          />
        </div>
        <the-card v-else>
          <the-text en="There is no data" ar="لا توجد بيانات" />
        </the-card>
      </transition>
      <!-- </transition> -->
    </div>
  </div>
  <the-modal :open="del_modal" blur @close="del_modal = false">
    <template #title>
      <the-text
        class="text-xs md:text-base capitalize"
        en="delete item"
        ar="حذف عنصر"
      />
    </template>
    <div>
      <the-text
        class="text-xs md:text-base capitalize"
        en="are you sure to delete this item ?"
        ar="هل أنت متأكد من حذف هذا العنصر ؟"
      />
      <the-text
        class="text-xs md:text-base text-gray-500 my-2"
        :en="`title : ${getItem(item_id).title}`"
        :ar="`العنوان ${getItem(item_id).title}`"
      />
      <the-text
        class="text-xs md:text-base text-gray-500 my-2"
        :en="`type : ${getItem(item_id).type.en}`"
        :ar="`النوع ${getItem(item_id).type.ar}`"
      />
    </div>
    <template #footer>
      <div class="flex justify-between mt-2">
        <the-button @click="del_modal = false">
          <the-text ar="إلغاء" en="cancel" />
        </the-button>
        <the-button class="" @click="confirmDeletion">
          <the-text en="yes" ar="نعم"
        /></the-button>
      </div>
    </template>
  </the-modal>
  <the-modal :open="edit_modal" @close="edit_modal = false">
    <template #title>
      <the-text
        en="modify the item"
        ar="تعديل العنصر"
        class="text-xs md:text-base capitalize"
      />
    </template>
    <div>
      <textarea
        :placeholder="setText('العنوان', 'The title')"
        type="text"
        maxlength="12"
        v-model="modified_item.title"
        class="outline-none resize-none bg-transparent text-xs md:text-sm w-full text-primary capitalize border p-0.5"
      ></textarea>
      <textarea
        :placeholder="setText('الشرح', 'The description')"
        type="text"
        v-model="modified_item.desc"
        rows="3"
        class="outline-none resize-none bg-transparent text-xs md:text-sm w-full leading-3 p-2 border h-40"
      ></textarea>
    </div>
    <template #footer>
      <div class="flex justify-between">
        <the-button @click="edit_modal = false">
          <the-text ar="إلغاء" en="cancel" />
        </the-button>
        <the-button @click="confirmModification">
          <the-text ar="تعديل" en="modify" />
        </the-button>
      </div>
    </template>
  </the-modal>
  <the-modal :open="delAll_modal" blur @close="delAll_modal = false">
    <template #title>
      <div class="flex items-center">
        <the-text
          en="delete the results"
          ar="حذف النتائج"
          class="text-xs md:text-base capitalize text-red-500 font-bold"
        />
        <fs-icon
          :icon="['fas', 'warning']"
          class="text-red-500 ms-2"
          size="lg"
        />
      </div>
    </template>
    <div class="border border-red-500 p-2 text-red-400">
      <the-text
        :en="`are you sure to delete <mark class='px-1'>${filteredData.length}</mark> items`"
        :ar="`هل أنت متاكد من حذف  <mark class='px-1'>${filteredData.length}</mark> عنصر ؟`"
      />
    </div>
    <template #footer>
      <div class="flex justify-between">
        <the-button class="bg-red-500" @click="deleteResults()"
          ><the-text en="yes" ar="نعم"
        /></the-button>
        <the-button class="bg-green-500" @click="delAll_modal = false"
          ><the-text en="cancel" ar="إلغاء"
        /></the-button>
      </div>
    </template>
  </the-modal>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      delAll_modal: false,
      search: "",
      types: [
        {
          en: "homework",
          ar: "منزلي",
        },
        {
          en: "business",
          ar: "أعمال",
        },
        {
          en: "vacation",
          ar: "عطلة",
        },
        {
          en: "academic",
          ar: "أكاديمي",
        },
      ],
      modified_item: {},
      taregtEl: null,
      item_id: 0,
      edit_modal: false,
      del_modal: false,
      filters: {
        completed: "all",
        date: "newest",
        type: ["homework", "business", "vacation", "academic"],
      },
    };
  },
  computed: {
    ...mapState({
      items: "items",
    }),
    ...mapGetters({
      getItem: "getItemById",
    }),
    selectedTypes() {
      return this.types.filter(
        (type) => type.en == this.filters.type.find((tp) => tp == type.en)
      );
    },
    filteredData() {
      return this.items
        .filter(
          (item) =>
            item.type.en == this.filters.type.find((ftp) => ftp == item.type.en)
        )
        .filter((item) =>
          this.filters.completed == "all"
            ? item
            : item.completed + "" == this.filters.completed
        )
        .sort((a, b) =>
          this.filters.date == "newest" ? b.id - a.id : a.id - b.id
        )
        .filter((item) => {
          if (this.search.trim() != "") return item.title.match(this.search);
          else return item;
        });
    },
  },
  methods: {
    ...mapActions({
      delete: "deleteItem",
      update: "updateItem",
      modify: "modifyItem",
      complete: "completeItem",
    }),

    deleteItem(payload) {
      this.taregtEl = payload.target;

      this.item_id = payload.value;
      this.del_modal = true;
    },
    confirmDeletion() {
      this.del_modal = false;
      this.taregtEl.classList.remove("enter");
      this.taregtEl.classList.add("leave");
      setTimeout(() => {
        // this.taregtEl.classList.remove("leave");

        this.delete(this.item_id);
        this.item_id = 0;
        this.taregtEl = null;
      }, 150);
    },
    confirmModification() {
      this.modify(this.modified_item);
      this.edit_modal = false;
    },
    completeItem(id) {
      this.complete(id);
    },
    editItem(id) {
      this.edit_modal = true;
      this.modified_item = JSON.parse(JSON.stringify(this.getItem(id)));
    },
    setText(ar, en) {
      if (this.$store.state.lang == "ar") return ar;
      return en;
    },
    deleteResults() {
      this.delAll_modal = false;

      this.delete(Array.from(this.filteredData, (item) => item.id));
    },
  },
};
</script>
<style scoped>
.view-enter-from {
  transform: scale(0.95);
  opacity: 0;
}
.view-enter-active {
  transition: all 0.2s ease-out;
  transition-delay: 0.2s;
}
.view-enter-to {
  transform: scale(1);
  opacity: 1;
}
.view-leave-from {
  transform: scale(1);
  opacity: 1;
}
.view-leave-active {
  transition: all 0.2s ease-out;
}
.view-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
[typeOption] > label:hover * {
  color: #fff;
}
</style>
