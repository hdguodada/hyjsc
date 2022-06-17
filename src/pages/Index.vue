<template>
  <div class="lg:container" style="height: 600px">
    <HyMap />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import HyMap from "../components/hyMap/index.vue";

const target = ref<HTMLElement>();

onClickOutside(target, (event) => {
  console.log(event);
});
</script>
