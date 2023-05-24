<script lang="ts" setup>
import {ILogin} from "~/interfaces/ILogin";
import {useAuthStore} from "~/stores/auth";
const router = useRouter()
const loginForm = ref(<ILogin>{})
const authStore = useAuthStore();

async function login() {
  await authStore.login(loginForm.value).then(() => {
    router.push({ name: 'workspace' })
  })
}
</script>

<template>
  <PageWrapper>
    <PageSection class="absolute inset-0 inset-y-2/4 -mt-[60px] flex flex-col items-center justify-center">
      <PageSectionTitle class="font-bold text-2xl">
        Авторизация
      </PageSectionTitle>
      <form @submit.prevent="login" class="flex flex-col gap-y-4 min-w-[400px] px-4">
        <FormInput label="Логин" placeholder="Логин" type="text" v-model="loginForm.login" />
        <FormInput label="Пароль" placeholder="Пароль" type="password" v-model="loginForm.password" />
        <Button type="submit" :block="true" @click="login">Авторизоваться</Button>
      </form>
    </PageSection>
  </PageWrapper>
</template>

<style scoped>

</style>