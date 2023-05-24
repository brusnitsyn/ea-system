<script lang="ts" setup>
import { definePageMeta } from "#imports";
import { useEquipmentStore } from "~/stores/equipment";
import { useAccessorStore } from "~/stores/accessor";
import {useAuthStore} from "~/stores/auth";

const route = useRoute();
const equipmentStore = useEquipmentStore();
const accessorStore = useAccessorStore();
const authStore = useAuthStore();

await useAsyncData(() => equipmentStore.fetchEquipment(route.params.id));
await useAsyncData(() => accessorStore.fetchTypes());
await useAsyncData(() => accessorStore.fetchStatuses());
await useAsyncData(() => accessorStore.fetchAccessories({ 'filter[equipment_id]': route.params.id }));

const accessorData = ref({
  equipment_id: route.params.id,
  type: accessorStore.types[0],
  status: accessorStore.statuses[0],
});

async function createAccessor() {
  await accessorStore.createAccessor(accessorData.value).then(() => {
    closeAccessorDialog();
    clearAccessorData();
  });
}

function clearAccessorData() {
  accessorData.value = {
    equipment_id: route.params.id,
    type: accessorStore.types[0],
    status: accessorStore.statuses[0],
  };
}

const isOpenAccessorDialog = ref(false);

function closeAccessorDialog() {
  isOpenAccessorDialog.value = false;
}
function openAccessorDialog() {
  isOpenAccessorDialog.value = true;
}

definePageMeta({
  layout: "workspace",
});
</script>

<template>
  <PageWrapper>
    <div class="mb-3 flex flex-col md:flex-row justify-between">
      <div class="flex flex-col">
        <PageTitle class="!text-2xl !mb-1">
          {{ equipmentStore.equipment.title }}
        </PageTitle>
        <span class="text-gray-400"
          >Серийный номер: {{ equipmentStore.equipment.serial }}</span
        >
      </div>
      <div
        class="self-start bg-neutral-100 px-4 py-2 flex gap-x-2 mt-2 md:mt-0 md:flex-col md:text-end"
      >
        <p class="leading-5">Тех-сотрудник</p>
        <p class="leading-5">{{ equipmentStore.equipment.worker.name }}</p>
      </div>
    </div>
    <PageSection v-if="equipmentStore.equipment.comments.length">
      <PageSectionTitle class="text-lg font-semibold">
        Комментарии
      </PageSectionTitle>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <CardComment v-for="comment in equipmentStore.equipment.comments" :key="comment.id" :comment-item="comment" />
      </div>
    </PageSection>
    <PageSection class="mt-4">
      <div class="flex flex-col md:flex-row justify-between md:items-center">
        <PageSectionTitle class="text-lg font-semibold mb-0">
          Комплектующие
        </PageSectionTitle>
        <Button v-if="authStore.hasAdmin" @click="openAccessorDialog"> Добавить комплектующие </Button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 mt-4 gap-2">
        <CardAccessor v-for="accessor in accessorStore.accessories" :key="accessor.id" :accessor-item="accessor" />
      </div>
    </PageSection>
  </PageWrapper>

  <HeadlessTransitionRoot appear :show="isOpenAccessorDialog" as="template">
    <HeadlessDialog as="div" @close="closeAccessorDialog" class="relative z-10">
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
                Добавить комплектующие
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

              <div class="mt-6">
                <Button :block="true" @click="createAccessor">
                  Добавить
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
