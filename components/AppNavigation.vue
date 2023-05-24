<script lang="ts" setup>
const props = defineProps(['mode'])
</script>

<template>
  <PageContainer class="z-40">
    <aside class="flex flex-row items-center justify-between py-4 ">
      <img src="/logo.png" width="30" height="30" />
      <NavigationWrapper :mode="mode" />
    </aside>
  </PageContainer>
</template>

<style scoped>

</style>