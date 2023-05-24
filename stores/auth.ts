import { UseFetchOptions } from "#app";
import {defineStore} from "pinia";
import {useFetchApi} from "~/composables/useFetchApi";
import {ILogin} from "~/interfaces/ILogin";
import {RULE_ADMIN, RULE_TEACHER, RULE_WORKER} from "~/constants/rules";
import {IRegister} from "~/interfaces/IRegister";

export const useAuthStore = defineStore("authStore", () => {
    const user = ref(null);
    const loggedIn = ref(false);
    const token = useCookie('token')

    const hasAdmin = computed(() => user.value?.rule.slug === RULE_ADMIN)
    const hasTeacher = computed(() => user.value?.rule.slug === RULE_TEACHER)
    const hasWorker = computed(() => user.value?.rule.slug === RULE_WORKER)

    // Methods
    async function fetchUser() {
        await useFetchApi(`/account/user`)
            .then((response) => {
                if (response.error.value) {
                    user.value = null;
                    loggedIn.value = false;
                    token.value = null
                } else {
                    user.value = response.data.value;
                    loggedIn.value = true;
                }
            })
    }

    async function login(loginForm: ILogin) {
        const options: UseFetchOptions<T> = {
            method: "POST",
            body: loginForm,
        };

        await useFetchApi(`/account/login`, options)
            .then((response) => {
                const token = useCookie("token");
                token.value = response.data.value.token;
                loggedIn.value = true;
            })
            .catch(() => {
                user.value = null;
                loggedIn.value = false;
            });

        if (loggedIn.value) await fetchUser();
    }

    async function register(registerForm: IRegister) {
        const options: UseFetchOptions<T> = {
            method: "POST",
            body: registerForm,
        };

        await useFetchApi(`/account/register`, options)
    }

    async function logout() {
        const options: UseFetchOptions<T> = {
            method: "POST",
        };

        await useFetchApi(`/account/logout`, options)
            .then((response) => {
                const token = useCookie("token");
                token.value = null;
                loggedIn.value = false;
                navigateTo('/auth/login')
            })
    }

    return {
        user,
        loggedIn,
        hasAdmin,
        hasTeacher,
        hasWorker,
        fetchUser,
        login,
        register,
        logout
    };
});
