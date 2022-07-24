<script setup>
const loaded = ref(false)

onMounted(() => (loaded.value = true))
</script>

<template>
  <div class="max-h-screen h-screen w-screen max-w-screen flex flex-col lg:flex-row">
    <Sidebar v-if="loaded" class="hidden lg:block m-2" />
    <div
      class="px-4 sm:px-8 md:px-10 lg:px-8 pt-4 mx-auto grow w-full h-full overflow-y-auto no-scrollbar"
      style="max-width: 1800px"
    >
      <slot class="overflow-x-hidden" />
    </div>
    <Navbar v-if="loaded" class="lg:hidden relative z-10 w-full p-2 sm:p-4" />
  </div>
</template>
