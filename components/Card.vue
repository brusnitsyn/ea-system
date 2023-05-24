<script lang="ts" setup>
const props = defineProps(["image", "icon", "iconSize", "imageSize"]);
</script>

<template>
  <div class="relative flex flex-col rounded-lg">
    <img
      v-if="image"
      :src="image"
      :width="imageSize"
      :height="imageSize"
      alt="pic"
    />
    <Icon v-else-if="icon" :name="icon" :size="iconSize" />
    <h2 class="text-sm md:text-lg font-semibold leading-5 mt-1">
      <slot name="title"> Card component slot title </slot>
    </h2>
    <p v-if="$slots.text" class="">
      <slot name="text"> Card component slot text </slot>
    </p>
  </div>
</template>

<style scoped></style>
