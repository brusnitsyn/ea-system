<script lang="ts" setup>
import {useAuthStore} from "~/stores/auth";
import {useEquipmentStore} from "~/stores/equipment";

const props = defineProps(["equipmentItem"]);

const router = useRouter();
const authStore = useAuthStore();
const equipmentStore = useEquipmentStore();

const commentData = ref({})

async function createComment() {
  await equipmentStore.createComment(props.equipmentItem.id, commentData.value).then(() => closeCommentDialog())
}

const isOpenCommentDialog = ref(false)
function closeCommentDialog() {
  isOpenCommentDialog.value = false
  commentData.value = {}
}
function openCommentDialog() {
  isOpenCommentDialog.value = true
}
</script>

<template>
  <div class="border border-black p-4">
    <div class="flex flex-col gap-y-4 md:flex-row justify-between">
      <div class="flex flex-col">
        <h2 class="font-semibold">
          {{ equipmentItem.title }}
        </h2>
        <ul class="flex flex-col gap-y-0.5 text-gray-400">
          <li>Серийный номер: {{ equipmentItem.serial }}</li>
        </ul>
      </div>
      <Button v-if="authStore.hasTeacher" @click="openCommentDialog" class="w-full md:w-auto" :block="true">
        Оставить комментарий
      </Button>
      <Button v-if="authStore.hasAdmin || authStore.hasWorker" @click="router.push({ name: 'workspace-detail-id', params: { id: equipmentItem.id } })" class="w-full md:w-auto" :block="true">
        Подробнее
      </Button>
    </div>
  </div>
  <HeadlessTransitionRoot appear :show="isOpenCommentDialog" as="template">
    <HeadlessDialog as="div" @close="closeCommentDialog" class="relative z-10">
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
                {{ equipmentItem.title }}
              </HeadlessDialogTitle>
              <div class="mt-2">
                <FormInput type="textarea" v-model="commentData.text" placeholder="Опишите проблему" />
              </div>

              <div class="mt-4">
                <Button :block="true" @click="createComment">
                  Оставить комментарий
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
