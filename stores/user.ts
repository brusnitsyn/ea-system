import {defineStore} from "pinia";
import {useFetchApi} from "~/composables/useFetchApi";
import {UseFetchOptions} from "#app";
import {RULE_TEACHER, RULE_WORKER} from "~/constants/rules";

export const useUserStore = defineStore("userStore", () => {
    const users = ref([]);
    const user = ref();
    const meta = ref([])

    const workers = computed(() => users.value.filter((user) => user.rule.slug === RULE_WORKER))
    const teachers = computed(() => users.value.filter((user) => user.rule.slug === RULE_TEACHER))

    async function fetchUsers(query?: object) {
        const options: UseFetchOptions<T> = {
            method: "GET",
            query,
        };
        await useFetchApi(`/users`, options).then((response) => {
            users.value = response.data.value.data
        })
    }

    return {
        users,
        user,
        meta,
        workers,
        teachers,
        fetchUsers,
    };
});
