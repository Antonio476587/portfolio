<!-- import { defineComponent, h } from "vue";
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

export default Works; -->

<template>
  <div id="works-div">
    <a v-for="work in worksPresentation" :href="'/work/' + work.workUrlId">
      <img :src="work.img" :alt="work.alternativeText">
    </a>
  </div>
</template>

<script setup lang="ts">
  import worksPresentation from "./worksPresentation"; 
</script>