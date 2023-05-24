<script lang="ts" setup>
import DateTimePicker from "@vuepic/vue-datepicker";

const props = defineProps(["label", "modelValue"]);
const emits = defineEmits(['update:model-value'])

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:model-value', value)
    console.log(value)
  }
})

const format = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}.${month}.${year}`
}
</script>

<template>
  <div class="flex flex-col gap-y-1">
    <label> {{ label }} </label>
    <DateTimePicker locale="ru" v-model="inputValue" :format="format" cancel-text="Отмена" select-text="Выбрать">
      <template #input-icon>
      </template>
    </DateTimePicker>
  </div>
</template>

<style scoped></style>
