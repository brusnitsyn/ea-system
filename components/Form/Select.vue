<script setup lang="ts">
const props = defineProps(["label", "items", "modelValue", "itemKey"]);
const emits = defineEmits(["update:model-value"])

const selectedItem = computed({
  get: () => props.modelValue ? props.modelValue : props.items[0],
  set: (value: unknown) => {
    emits("update:model-value", value);
  },
});
</script>

<template>
  <div class="flex flex-col h-full">
    <label v-if="label">
      {{ label }}
    </label>
    <HeadlessListbox v-model="selectedItem">
      <div class="relative mt-1">
        <HeadlessListboxButton
          v-slot="{ open }"
          class="relative w-full cursor-default bg-white pl-4 py-3 pr-10 text-left border border-black focus:outline-none focus-visible:border-black focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-sm"
        >
          <span class="block truncate">{{ itemKey ? selectedItem[itemKey] : selectedItem.title }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4"
          >
            <Icon
              name="fluent:chevron-down-16-filled"
              class="h-5 w-5 transition-transform transform"
              :class="open && 'rotate-135'"
              aria-hidden="true"
            />
          </span>
        </HeadlessListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <HeadlessListboxOptions
            class="z-10 absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-md border border-black ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <HeadlessListboxOption
              v-slot="{ active, selected }"
              v-for="item in items"
              :key="item.id"
              :value="item"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-gray-200 text-black' : 'text-black',
                  'relative cursor-pointer select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ itemKey ? item[itemKey] : item.title }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                >
                  <Icon
                    name="fluent:checkmark-16-regular"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </li>
            </HeadlessListboxOption>
          </HeadlessListboxOptions>
        </transition>
      </div>
    </HeadlessListbox>
  </div>
</template>
