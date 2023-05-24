<script lang="ts" setup>
const props = defineProps(["modelValue", "label", "placeholder", "type"]);
const emits = defineEmits(["update:model-value"]);

const id = `input-${Math.floor(Math.random() * 10)}`;
const hasTextarea = computed(() => props.type === "textarea");

const inputValue = computed({
  get: () => props.modelValue,
  set: (value: unknown) => {
    emits("update:model-value", value);
  },
});
</script>

<template>
  <div class="flex flex-col gap-y-1">
    <label :for="id">
      {{ label }}
    </label>
    <textarea
      v-if="hasTextarea"
      v-model="inputValue"
      :id="id"
      rows="6"
      class="resize-none appearance-none outline-none border py-2.5 px-3 border-black"
      :placeholder="placeholder"
    />
    <input
      v-else
      v-model="inputValue"
      :id="id"
      :type="type"
      class="appearance-none outline-none border py-2.5 px-3 border-black"
      :placeholder="placeholder"
    />
  </div>
</template>

<style scoped></style>
