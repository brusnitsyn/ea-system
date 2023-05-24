<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";
import {useRuleStore} from "~/stores/rule";
import {useFacultyStore} from "~/stores/faculty";
import {useDepartmentStore} from "~/stores/department";
import {useAudienceStore} from "~/stores/audience";
import {useUserStore} from "~/stores/user";
import {useEquipmentStore} from "~/stores/equipment";

const authStore = useAuthStore();
const ruleStore = useRuleStore();
const userStore = useUserStore();
const facultyStore = useFacultyStore();
const departmentStore = useDepartmentStore()
const audienceStore = useAudienceStore()
const equipmentStore = useEquipmentStore()

await useAsyncData(() => ruleStore.fetchRules());
await useAsyncData(() => userStore.fetchUsers());

const user = computed(() => authStore.user);

const accountData = ref({
  rule: ruleStore.rules[0]
})


await useAsyncData(() => facultyStore.fetchFaculties());
await useAsyncData(() => departmentStore.fetchDepartments());
await useAsyncData(() => audienceStore.fetchAudiences());

const selectedFaculty = ref(facultyStore.faculties[0])
const departments = computed(() => departmentStore.departments.filter((department) => department.faculty_id === selectedFaculty.value.id))
const selectedDepartment = ref(departments.value[0])
const audiences = computed(() => audienceStore.audiences.filter((audience) => audience.department_id === selectedDepartment.value.id))

const equipmentData = ref({
  audience: audiences.value[0],
  worker: userStore.workers[0]
})

async function registerUser() {
  await authStore.register(accountData.value).then(() => {
    closeAccountDialog();
  });
}
async function storeEquipment() {
  await equipmentStore.createEquipment(equipmentData.value).then(() => {
    closeEquipmentDialog();
  });
}

// Dialogs
const isOpenAccountDialog = ref(false)
const isOpenEquipmentDialog = ref(false)

function closeAccountDialog() {
  isOpenAccountDialog.value = false
  accountData.value = {
    rule: ruleStore.rules[0]
  }
}
function closeEquipmentDialog() {
  isOpenEquipmentDialog.value = false
  equipmentData.value = {
    audience: audiences.value[0],
    worker: userStore.workers[0]
  }
}
function openAccountDialog() {
  isOpenAccountDialog.value = true
}
function openEquipmentDialog() {
  isOpenEquipmentDialog.value = true
}
</script>

<template>
  <HeadlessPopover v-slot="{ open }">
    <HeadlessPopoverButton
      :class="open ? '' : 'text-opacity-90'"
      class="group inline-flex items-center rounded-md px-3 py-2 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <div class="flex flex-col text-black text-right">
        <p class="leading-5">{{ user.name }}</p>
        <p class="leading-5">{{ user.rule.title }}</p>
      </div>
      <Icon
        name="fluent:chevron-down-16-filled"
        :class="open ? '' : 'text-opacity-70'"
        class="ml-4 h-5 w-5 text-black transition duration-150 ease-in-out group-hover:text-opacity-80"
        aria-hidden="true"
      />
    </HeadlessPopoverButton>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <HeadlessPopoverPanel
        class="absolute inset-x-0 lg:left-1/2 z-10 mt-3 w-full transform px-4 sm:px-0 lg:max-w-sm lg:translate-x-1/2"

      >
        <div
          class="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="relative grid gap-3 bg-white border border-white p-4">
            <div v-if="authStore.hasAdmin" class="flex flex-col gap-y-1">
              <Button :block="true" @click="openAccountDialog">
                Создать учетную запись
              </Button>
              <Button :block="true" @click="openEquipmentDialog">
                Добавить оборудование
              </Button>
            </div>
            <Button :block="true" @click="authStore.logout">
              Выход
            </Button>
          </div>
        </div>
      </HeadlessPopoverPanel>
    </Transition>
  </HeadlessPopover>

  <HeadlessTransitionRoot appear :show="isOpenAccountDialog" as="template">
    <HeadlessDialog as="div" @close="closeAccountDialog" class="relative z-10">
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
                Создать учетную запись
              </HeadlessDialogTitle>
              <div class="mt-2 flex flex-col gap-y-2">
                <FormSelect :items="ruleStore.rules" label="Права" v-model="accountData.rule" />
                <FormInput type="text" name="name" placeholder="Имя" label="Имя" v-model="accountData.name" />
                <FormInput type="text" name="login" placeholder="Логин" label="Логин" v-model="accountData.login" />
                <FormInput type="password" name="password" placeholder="Пароль" label="Пароль" v-model="accountData.password" />
              </div>

              <div class="mt-6">
                <Button :block="true" @click="registerUser">
                  Создать учетную запись
                </Button>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>

  <HeadlessTransitionRoot appear :show="isOpenEquipmentDialog" as="template">
    <HeadlessDialog as="div" @close="closeEquipmentDialog" class="relative z-10">
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
                Добавить оборудование
              </HeadlessDialogTitle>
              <div class="mt-2 flex flex-col gap-y-2">
                <FormSelect :items="facultyStore.faculties" label="Факультет" v-model="selectedFaculty" />
                <FormSelect :items="departments" label="Кафедра" v-model="selectedDepartment" />
                <FormSelect :items="audiences" label="Аудитория" v-model="equipmentData.audience" />
                <FormSelect item-key="name" :items="userStore.workers" label="Тех-сотрудник" v-model="equipmentData.worker" />
                <FormInput type="text" name="title" placeholder="Наименование" label="Наименование" v-model="equipmentData.title" />
                <FormInput type="text" name="serial" placeholder="Серийный номер" label="Серийный номер" v-model="equipmentData.serial" />
              </div>

              <div class="mt-6">
                <Button :block="true" @click="storeEquipment">
                  Добавить оборудование
                </Button>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<style scoped>

</style>