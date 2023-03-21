import { defineComponent, createSSRApp } from "../../ext_modules/vue/dist/vue.esm-browser.js";
import worksPresentation from "./worksPresentation.ts";

const Works = defineComponent ({
    components: {},
    data() {
        return {
            proto: "type",
            worksPresentation,
        }
    },
    template: `
    <a v-for="work in worksPresentation" :href="'/work/' + work.workUrlId">
        <img :src="work.img" :alt="work.alternativeText">
    </a>
    `,
    name: "Works",
});

try {
  const works = document.getElementById("Works");
  const app = createSSRApp(Works);
  if (works) {
    app.mount("#Works");
  }
} catch (e) {
  console.error(e);
}

export default Works;