<script setup>
const loaded = ref(false)
onMounted(() => (loaded.value = true))
</script>

<template>
  <div class="h-screen px-4 sm:px-8 md:px-10 lg:px-16 pt-4 mx-auto" style="max-width: 1800px">
    <Sidebar v-if="loaded" class="fixed z-10 hidden xl:block left-2 inset-y-2" />
    <slot class="overflow-x-hidden" />
    <div class="h-16 w-full md:hidden" />
    <Navbar v-if="loaded" class="fixed bottom-2 z-10 inset-x-2 sm:inset-x-4" />
  </div>
</template>
