import { defineComponent, createSSRApp, h } from "https://esm.sh/vue@3.2.47";
import worksPresentation from "./worksPresentation.ts";

const Works = defineComponent ({
    components: {},
    data() {
        return {
            proto: "type",
            worksPresentation,
        }
    },
    name: "Works",
    render() {
      return h(
        "div",
        worksPresentation.map(work => {
          return h(
            "a",
            { "href": `/work/${work.workUrlId}` },
            h(
              "img",
              { "src": work.img, "alt": work.alternativeText }
            )
          )
        })
      )
    },
    // template: `
    // <a v-for="work in worksPresentation" :href="'/work/' + work.workUrlId">
    //     <img :src="work.img" :alt="work.alternativeText">
    // </a>
    // `,
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