import {defineStore} from "pinia";
import {useFetchApi} from "~/composables/useFetchApi";
import {UseFetchOptions} from "#app";

export const useRuleStore = defineStore("ruleStore", () => {
    const rules = ref([]);
    const rule = ref();
    const meta = ref([])

    async function fetchRules(query?: object) {
        const options: UseFetchOptions<T> = {
            method: "GET",
            query,
        };
        await useFetchApi(`/rules`, options).then((response) => {
            rules.value = response.data.value
        })
    }

    return {
        rules,
        rule,
        meta,
        fetchRules,
    };
});
