import { createApp } from "vue";
const app = createApp(App);
import App from "./App.vue";

import store from "./store/index.js";
import "./assets/tailwind.css";
import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(...[fas, far, fab]);

/* add icons to the library */
// tools
import theText from "@/components/tools/theText.vue";
app.component("the-text", theText);
import theItem from "@/components/tools/theItem.vue";
app.component("the-item", theItem);
// UI
import theCard from "@/components/UI/theCard.vue";
app.component("the-card", theCard);
import checkBox from "@/components/UI/checkBox.vue";
app.component("checkBox", checkBox);

import theButton from "@/components/UI/theButton.vue";
app.component("the-button", theButton);


import theModal from "@/components/UI/theModal.vue";
app.component("the-modal", theModal);
import theSelect from "@/components/UI/theSelect.vue";
app.component("the-select", theSelect);
// -------------------------- layouts
import theNav from "@/components/layout/theNav.vue";
app.component("the-nav", theNav);

// ---------------------------
library.add(fas, far, fab);
app.component("fs-icon", FontAwesomeIcon);

// ----------------------------
app.use(store);
app.mount("#app");
