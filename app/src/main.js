import App from "./App.vue";
import VueMaterial from "vue-material";
import Vue from "vue";
import router from "./router";
import VueResource from "vue-resource";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/index.css";

Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VueToast, {
  position: "top-right",
  duration: 3000,
});

new Vue({
  el: "#app",
  // Attach the Vue instance to the window,
  // so it's available globally.
  created: function () {
    window.Vue = this;
  },
  router,
  render: (h) => h(App),
});
