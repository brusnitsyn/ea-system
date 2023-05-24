import {defineStore} from "pinia";
import {useFetchApi} from "~/composables/useFetchApi";
import {UseFetchOptions} from "#app";

export const useFacultyStore = defineStore("facultyStore", () => {
    const faculties = ref([]);
    const faculty = ref();
    const meta = ref([])

    async function fetchFaculties(query?: object) {
        const options: UseFetchOptions<T> = {
            method: "GET",
            query,
        };
        await useFetchApi(`/faculties`, options).then((response) => {
            faculties.value = response.data.value.data
            meta.value = response.data.value.meta
        })
    }

    return {
        faculties,
        faculty,
        meta,
        fetchFaculties,
    };
});
