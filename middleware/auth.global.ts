export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");
  if (!token.value && to.meta.layout === 'workspace') return navigateTo("/auth/login");
});
