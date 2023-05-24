import {useAuthStore} from "~/stores/auth";

export default defineNuxtPlugin(async () => {
    const token = useCookie("token");
    const auth = useAuthStore();

    if (token.value) {
        await auth.fetchUser();
    }
});