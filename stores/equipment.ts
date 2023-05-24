import {defineStore} from "pinia";
import {useFetchApi} from "~/composables/useFetchApi";
import {UseFetchOptions} from "#app";

export const useEquipmentStore = defineStore("equipmentStore", () => {
    const equipments = ref([]);
    const equipment = ref();
    const meta = ref([])

    async function fetchEquipments(query?: object) {
        const options: UseFetchOptions<T> = {
            method: "GET",
            query,
        };
        await useFetchApi(`/equipments`, options).then((response) => {
            equipments.value = response.data.value.data
            meta.value = response.data.value.meta
        })
    }

    async function fetchEquipment(id: number) {
        const options: UseFetchOptions<T> = {
            method: "GET",
        };
        await useFetchApi(`/equipments/${id}`, options).then((response) => {
            equipment.value = response.data.value.data
        })
    }

    async function createEquipment(equipmentForm: object) {
        const options: UseFetchOptions<T> = {
            method: "POST",
            body: equipmentForm,
        };
        await useFetchApi(`/equipments`, options).then((response) => {
            equipments.value.push(response.data.value.data)
        })
    }

    async function createComment(equipmentId: number, commentForm: object) {
        const options: UseFetchOptions<T> = {
            method: "POST",
            body: commentForm,
        };
        await useFetchApi(`/equipments/${equipmentId}/comment`, options).then((response) => {
            const createdComment = response.data.value.data
            const currentEquipment = equipments.value.find(equipment => equipment.id === equipmentId)
            console.log(currentEquipment)
            currentEquipment.comments.push(createdComment)
        })
    }

    async function updateComment(equipmentId: number, commentForm: object) {
        const options: UseFetchOptions<T> = {
            method: "POST",
            body: commentForm,
        };
        await useFetchApi(`/equipments/${equipmentId}/comment/${commentForm.id}`, options).then((response) => {
            const updatedComment = response.data.value.data
            const oldComment = equipment.value.comments.find(comment => comment.id === updatedComment.id)
            const index = equipment.value.comments.value.indexOf(oldComment) - 1;
            equipment.value.comments.value.splice(index, 1, updatedComment);
        })
    }

    return {
        equipments,
        equipment,
        meta,
        fetchEquipments,
        fetchEquipment,
        createEquipment,
        createComment,
        updateComment
    };
});
