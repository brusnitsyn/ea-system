import {defineStore} from "pinia";
import {useFetchApi} from "~/composables/useFetchApi";
import {UseFetchOptions} from "#app";

export const useAudienceStore = defineStore("audienceStore", () => {
    const audiences = ref([]);
    const audience = ref();
    const meta = ref([])

    async function fetchAudiences(query?: object) {
        const options: UseFetchOptions<T> = {
            method: "GET",
            query,
        };
        await useFetchApi(`/audiences`, options).then((response) => {
            audiences.value = response.data.value.data
            meta.value = response.data.value.meta
        })
    }

    return {
        audiences,
        audience,
        meta,
        fetchAudiences,
    };
});
