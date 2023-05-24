<script lang="ts" setup>
import {definePageMeta} from "#imports";
import {useFacultyStore} from "~/stores/faculty";
import {useDepartmentStore} from "~/stores/department";
import {useAudienceStore} from "~/stores/audience";
import {useEquipmentStore} from "~/stores/equipment";

const facultyStore = useFacultyStore();
const departmentStore = useDepartmentStore()
const audienceStore = useAudienceStore()
const equipmentStore = useEquipmentStore();

await useAsyncData(() => facultyStore.fetchFaculties());
await useAsyncData(() => departmentStore.fetchDepartments());
await useAsyncData(() => audienceStore.fetchAudiences());

const selectedFaculty = ref(facultyStore.faculties[0])
const departments = computed(() => departmentStore.departments.filter((department) => department.faculty_id === selectedFaculty.value.id))
const selectedDepartment = ref(departments.value[0])
const audiences = computed(() => audienceStore.audiences.filter((audience) => audience.department_id === selectedDepartment.value.id))
const selectedAudience = ref(audiences.value[0])

await useAsyncData(() => equipmentStore.fetchEquipments({ 'filter[audience_id]': selectedAudience.value.id }), { watch: [selectedAudience] });

definePageMeta({
  layout: 'workspace'
})
</script>

<template>
  <PageWrapper>
    <PageTitle class="!text-2xl">
      Рабочая область
    </PageTitle>
    <PageSection>
      <div class="flex flex-col gap-y-4">
        <div class="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4">
          <FormSelect label="Факультет" :items="facultyStore.faculties" v-model="selectedFaculty" />
          <FormSelect label="Кафедра" :items="departments" v-model="selectedDepartment" />
          <FormSelect label="Аудитория" :items="audiences" v-model="selectedAudience" />
        </div>
      </div>
    </PageSection>
    <PageSection class="mt-6">
      <PageSectionTitle class="text-lg font-semibold mt-4">
        Результаты {{ equipmentStore.equipments.length }}
      </PageSectionTitle>
      <div class="flex flex-col gap-y-2">
        <CardEquipment v-for="item in equipmentStore.equipments" :equipment-item="item" />
      </div>
    </PageSection>
  </PageWrapper>
</template>

<style scoped>

</style>