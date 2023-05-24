<template>
  <div class="relative flex flex-col min-h-screen">
    <AppNavigation mode="workspace" />
    <div class="flex-1 relative flex flex-col w-full h-full">
      <main class="flex-1 relative px-4 py-3.5 max-w-5xl w-full mx-auto">
        <slot>
          This is page in slot layout default
        </slot>
      </main>
    </div>
  </div>
</template>