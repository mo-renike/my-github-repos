import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  CoHamburgerMenu,
  CoLink,
  FaTwitter,
  CoLinkedin,
  CoStar,
  CoFork,
  CoWhatsapp,
  CoGmail,
} from "oh-vue-icons/icons";

addIcons(
  CoHamburgerMenu,
  CoLink,
  FaTwitter,
  CoLinkedin,
  CoStar,
  CoFork,
  CoWhatsapp,
  CoGmail
);

const app = createApp(App);
app.component("v-icon", OhVueIcon);

createApp(App).use(router).mount("#app");
