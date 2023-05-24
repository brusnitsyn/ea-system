<script lang="ts" setup>
import { getActivePage } from "~/utils/activePage";

const props = defineProps(["navigation"]);
const currentPage = computed(() => getActivePage());
const hasActive = computed(() => currentPage.value?.id === props.navigation.id);
</script>

<template>
  <li
    class="relative"
    :class="{
      'before:absolute before:-bottom-1 before:bg-indigo-500 before:w-full before:h-[2px]':
        hasActive,
    }"
  >
    <NuxtLink :to="navigation.to">
      {{ navigation.title }}
    </NuxtLink>
  </li>
</template>

<style scoped></style>
