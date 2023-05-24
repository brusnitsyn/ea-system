<script lang="ts" setup>
import { defaultItems } from "~/constants/navigations";
const props = defineProps(["mode"]);
const hasWorkspaceMode = computed(() => props.mode === "workspace");
const navigationItems = defaultItems;
</script>

<template>
  <nav>
    <ul class="flex flex-row gap-x-4">
      <div v-if="hasWorkspaceMode" class="flex flex-col">
        <UserPopover />
      </div>
      <NavigationItem
        v-else
        v-for="navigation in navigationItems"
        :key="navigation.id"
        :navigation="navigation"
      />
    </ul>
  </nav>
</template>

<style scoped></style>
