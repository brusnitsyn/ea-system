<script lang="ts" setup>
import {useAuthStore} from "~/stores/auth";
import {useAccessorStore} from "~/stores/accessor";
import defu from "defu";

const props = defineProps(["accessorItem"]);

const router = useRouter();
const authStore = useAuthStore();
const accessorStore = useAccessorStore();

await useAsyncData(() => accessorStore.fetchTypes());
await useAsyncData(() => accessorStore.fetchStatuses());

const accessorData = ref({})

async function updateAccessor() {
  accessorStore.updateAccessor(accessorData.value).then(() => closeEditDialog());
}

const isOpenEditDialog = ref(false)
function closeEditDialog() {
  isOpenEditDialog.value = false
  accessorData.value = {}
}
function openEditDialog() {
  isOpenEditDialog.value = true
  accessorData.value = defu(props.accessorItem)
}
</script>

<template>
  <div class="border border-black p-4">
    <div class="flex flex-col gap-y-4 md:flex-row justify-between">
      <div class="flex flex-col">
        <div class="flex flex-row flex-wrap gap-1">
          <span class="px-2 py-1.5 bg-neutral-100">
            {{ accessorItem.type.title }}
          </span>
          <span class="px-2 py-1.5 bg-neutral-100">
            {{ accessorItem.status.title }}
          </span>
        </div>
        <h2 class="font-semibold mt-2">
          {{ accessorItem.title }}
        </h2>
        <ul class="flex flex-col gap-y-0.5 text-gray-400">
          <li>Серийный номер: {{ accessorItem.serial }}</li>
        </ul>
        <Button v-if="authStore.hasWorker || authStore.hasAdmin" class="mt-4" :block="true" @click="openEditDialog">
          Редактировать
        </Button>
      </div>
    </div>
  </div>

  <HeadlessTransitionRoot appear :show="isOpenEditDialog" as="template">
    <HeadlessDialog as="div" @close="closeEditDialog" class="relative z-10">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="w-full max-w-lg transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <HeadlessDialogTitle
                as="h3"
                class="text-lg font-semibold leading-6 text-gray-900"
              >
                {{ accessorItem.title }}
              </HeadlessDialogTitle>
              <div class="mt-2 flex flex-col gap-y-2">
                <FormDatePicker
                  label="Дата покупки"
                  v-model="accessorData.date_buy"
                />
                <FormDatePicker
                  label="Дата гарантии"
                  v-model="accessorData.date_wrnt"
                />
                <FormSelect
                  label="Тип"
                  :items="accessorStore.types"
                  v-model="accessorData.type"
                />
                <FormSelect
                  label="Состояние"
                  :items="accessorStore.statuses"
                  v-model="accessorData.status"
                />
                <FormInput
                  type="text"
                  name="title"
                  label="Наименование"
                  v-model="accessorData.title"
                />
                <FormInput
                  type="text"
                  name="serial"
                  label="Серийный номер"
                  v-model="accessorData.serial"
                />
              </div>

              <div class="mt-4">
                <Button :block="true" @click="updateAccessor">
                  Сохранить
                </Button>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<style scoped></style>
