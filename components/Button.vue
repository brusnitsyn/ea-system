<script lang="ts" setup>
const props = defineProps({
  block: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "default",
  },
});
const emits = defineEmits(["click"]);

const primaryVariant = computed(() => props.variant === "default");
const secondaryVariant = computed(() => props.variant === "secondary");
</script>

<template>
  <div :class="{ 'w-full': block }">
    <button
      @click="emits('click')"
      class="appearance-none px-4 md:px-6 py-3"
      :class="{
        'w-full': block,
        'bg-black border border-black text-white': primaryVariant,
        'bg-transparent border border-black text-black': secondaryVariant,
      }"
    >
      <slot>
        <DevOnly> Button component slot </DevOnly>
      </slot>
    </button>
  </div>
</template>

<style scoped></style>
