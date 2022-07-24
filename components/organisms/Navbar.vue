<script setup>
const isOpen = ref(false)
const route = useRoute()

watch(route, () => (isOpen.value = false))
</script>

<template>
  <div>
    <div
      class="rounded-xl backdrop-blur-xl shadow-gray-xl py-2 min-w-full px-4 flex flex-row justify-between items-center relative z-10 bg-slate-700"
      :class="{ 'shadow-gray': isOpen }"
    >
      <div class="h-8 w-8">
        <img src="https://picsum.photos/200/300" alt="avatar" class="h-full w-full object-cover rounded" />
      </div>
      <p class="font-title text-lg">kalfort</p>
      <Hamburger v-model="isOpen" @toggled="isOpen = !isOpen" />
    </div>
    <transition
      enter-active-class="duration-200 ease-in-out"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="duration-200 ease-in-out"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <NavbarPopup v-if="isOpen" class="fixed inset-0 p-4 bg-slate-900" @close="isOpen = false" />
    </transition>
  </div>
</template>
