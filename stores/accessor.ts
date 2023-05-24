import {defineStore} from "pinia";
import {useFetchApi} from "~/composables/useFetchApi";
import {UseFetchOptions} from "#app";

export const useAccessorStore = defineStore("accessorStore", () => {
    const accessories = ref([]);
    const statuses = ref([]);
    const types = ref([]);
    const accessor = ref();
    const meta = ref([])

    async function fetchStatuses(query?: object) {
        const options: UseFetchOptions<T> = {
            method: "GET",
            query,
        };
        await useFetchApi(`/accessories/statuses`, options).then((response) => {
            statuses.value = response.data.value.data
            meta.value = response.data.value.meta
        })
    }
    async function fetchTypes(query?: object) {
        const options: UseFetchOptions<T> = {
            method: "GET",
            query,
        };
        await useFetchApi(`/accessories/types`, options).then((response) => {
            types.value = response.data.value.data
            meta.value = response.data.value.meta
        })
    }
    async function fetchAccessories(query?: object) {
        const options: UseFetchOptions<T> = {
            method: "GET",
            query,
        };
        await useFetchApi(`/accessories`, options).then((response) => {
            accessories.value = response.data.value.data
            meta.value = response.data.value.meta
        })
    }

    async function fetchAccessor(id: number) {
        const options: UseFetchOptions<T> = {
            method: "GET",
        };
        await useFetchApi(`/accessories/${id}`, options).then((response) => {
            accessor.value = response.data.value.data
        })
    }

    async function createAccessor(accessorForm: object) {
        const options: UseFetchOptions<T> = {
            method: "POST",
            body: accessorForm,
        };
        await useFetchApi(`/accessories`, options).then((response) => {
            accessories.value.push(response.data.value.data)
        })
    }

    async function updateAccessor(accessorForm: object) {
        const options: UseFetchOptions<T> = {
            method: "POST",
            body: accessorForm,
        };
        await useFetchApi(`/accessories/${accessorForm.id}`, options).then((response) => {
            const updatedAccessor = response.data.value.data
            const oldAccessor = accessories.value.find(accessor => accessor.id === updateAccessor.id)
            const index = accessories.value.indexOf(oldAccessor) - 1;
            accessories.value.splice(index, 1, updatedAccessor);
        })
    }

    return {
        accessories,
        statuses,
        types,
        accessor,
        meta,
        fetchTypes,
        fetchStatuses,
        fetchAccessories,
        fetchAccessor,
        createAccessor,
        updateAccessor,
    };
});
