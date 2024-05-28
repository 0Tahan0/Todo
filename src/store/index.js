import { createStore } from "vuex";
import localDB from "@/localDB";
import Item from "@/store/item";
export default createStore({
  state: {
    mode: "light",
    lang: "ar",
    items: [],
    theme: { value: "#f05", name: { en: "rose", ar: "روز" } },
  },
  getters: {
    getItemById: (state) => (id) => {
      return state.items.find((item) => item.id == id);
    },
  },
  mutations: {
    updateItem(state, val) {
      localDB.set(val, state[val]);
    },
    getItemFromDB(state, val) {
      if (localDB.get(val)) state[val] = localDB.get(val);
    },
    changeMode(state) {
      if (state.mode == "light") state.mode = "dark";
      else state.mode = "light";
    },
    changeLang(state) {
      if (state.lang == "en") state.lang = "ar";
      else state.lang = "en";
    },
    changeTheme(state, theme) {
      state.theme = theme;
    },
    setItem(state, obj) {
      const item = new Item();
      item.title = obj.title;
      item.desc = obj.desc;
      item.type = obj.type;
      state.items.push(item);
    },
    deleteItem(state, id) {
      if(id.length)
      state.items = state.items.filter((item)=>item.id != id.find((ID)=>ID == item.id))
      else
      state.items = state.items.filter((item) => item.id != id);
    },
    modifyItem(state, obj) {
      const current = state.items.find((item) => item.id == obj.id);
      let index = state.items.indexOf(current);
      state.items[index] = obj;
    },
    completeItem(state, id) {
      const current = state.items.find((item) => item.id == id);
      state.items.find((item) => item.id == id).completed = !current.completed;
    },
  },
  actions: {
    changeMode(context) {
      context.commit("changeMode");
      context.commit("updateItem", "mode");
      context.commit("getItemFromDB", "mode");
    },
    changeLang(context) {
      context.commit("changeLang");
      context.commit("updateItem", "lang");
      context.commit("getItemFromDB", "lang");
    },
    changeTheme(context, payload) {
      context.commit("changeTheme", payload);
      context.commit("updateItem", "theme");
      context.commit("getItemFromDB", "theme");
    },
    getData(context) {
      context.commit("getItemFromDB", "mode");
      context.commit("getItemFromDB", "lang");
      context.commit("getItemFromDB", "items");
      context.commit("getItemFromDB", "theme");
    },
    setItem(context, payload) {
      context.commit("setItem", payload);
      context.commit("updateItem", "items");
      context.commit("getItemFromDB", "items");
    },
    updateItem(context, payload) {
      context.commit("updateItem", payload);
      context.commit("updateItem", "items");
      context.commit("getItemFromDB", "items");
    },
    deleteItem(context, id) {
      context.commit("deleteItem", id);
      context.commit("updateItem", "items");
      context.commit("getItemFromDB", "items");
    },
    modifyItem(context, payload) {
      context.commit("modifyItem", payload);
      context.commit("updateItem", "items");
      context.commit("getItemFromDB", "items");
    },
    completeItem(context, id) {
      context.commit("completeItem", id);
      context.commit("updateItem", "items");
      context.commit("getItemFromDB", "items");
    },
  },
});
