<template>
  <div id="works">
    <a v-for="work in worksPresentation" :href="'/work/' + work.workUrlId">
      <img :src="work.img" :alt="work.alternativeText">
    </a>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import worksPresentation from "./worksPresentation"; 

  onMounted(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#works",
        toggleActions: "play none none reverse",
        start: "center top",
      }      
    });
    document.querySelectorAll("#works a").forEach((el, i) => tl.to(el, { autoAlpha: 0, duration: 0.25 }, ">"))
  });
</script> 