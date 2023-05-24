<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";
import {useCommentStore} from "~/stores/comments";

const props = defineProps(["commentItem"]);

const route = useRoute();
const authStore = useAuthStore();
const commentStore = useCommentStore();

async function deleteComment() {
  await commentStore.deleteComment(<string>props.commentItem.id).then((response) => {
    console.log(response)
  })
}

// Форматер даты
function formatDate(dateString: string) {
  const date = new Date(dateString);

  const dateTimeFormatOptions = <object>{
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };

  return new Intl.DateTimeFormat("default", dateTimeFormatOptions).format(date);
}

const isOpenDetailDialog = ref(false);
function closeDetailDialog() {
  isOpenDetailDialog.value = false;
}
function openDetailDialog() {
  isOpenDetailDialog.value = true;
}
</script>

<template>
  <div class="border border-black p-4">
    <div class="flex flex-col gap-y-4 md:flex-row justify-between">
      <div class="flex flex-col items-start w-full">
        <span class="px-2 py-1.5 bg-neutral-100">
          {{ formatDate(commentItem.created_at) }}
        </span>
        <p class="mt-1 line-clamp-2">
          {{ commentItem.text }}
        </p>
        <div class="mt-4 grid grid-cols-1 gap-1 w-full" :class="{ 'md:grid-cols-2': authStore.hasAdmin }">
          <Button
            v-if="authStore.hasWorker || authStore.hasAdmin"
            :block="true"
            @click="openDetailDialog"
          >
            Подробнее
          </Button>
          <Button
            v-if="authStore.hasAdmin"
            variant="secondary"
            :block="true"
            @click="deleteComment"
          >
            Удалить
          </Button>
        </div>
      </div>
    </div>
  </div>

  <HeadlessTransitionRoot appear :show="isOpenDetailDialog" as="template">
    <HeadlessDialog as="div" @close="closeDetailDialog" class="relative z-10">
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
                Комментарий
              </HeadlessDialogTitle>
              <div class="mt-2 flex flex-col gap-y-2">
                <p>
                  {{ commentItem.text }}
                </p>
              </div>

              <div class="mt-4">
                <Button :block="true" @click="closeDetailDialog">
                  Закрыть
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
