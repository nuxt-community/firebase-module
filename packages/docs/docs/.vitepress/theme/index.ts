import Theme from "vitepress/theme";
import "../style/vars.css";
import { h } from "vue";

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {});
  },
};
