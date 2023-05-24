<template>
  <Html lang="ru">
    <Body
      class="antialiased text-gray-800 bg-white"
    >
      <NuxtLayout>
        <NuxtLoadingIndicator
          :height="5"
          :duration="3000"
          :throttle="400"
          color="#6366f1"
        />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script lang="ts" setup></script>

<style>
</style>
