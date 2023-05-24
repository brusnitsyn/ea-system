import {defineStore} from "pinia";
import {useFetchApi} from "~/composables/useFetchApi";
import {UseFetchOptions} from "#app";

export const useDepartmentStore = defineStore("departmentStore", () => {
    const departments = ref([]);
    const department = ref();
    const meta = ref([])

    async function fetchDepartments(query?: object) {
        const options: UseFetchOptions<T> = {
            method: "GET",
            query,
        };
        await useFetchApi(`/departments`, options).then((response) => {
            departments.value = response.data.value.data
            meta.value = response.data.value.meta
        })
    }

    return {
        departments,
        department,
        meta,
        fetchDepartments,
    };
});
