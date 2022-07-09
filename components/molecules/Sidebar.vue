<script setup>
import Chevron from '~/assets/icons/chevron.svg'
import { useIndexStore } from '~/stores/index'
const index = useIndexStore()
const isOpen = ref(false)
</script>

<template>
  <div class="rounded-xl shadow-gray-xl bg-slate-800 flex flex-col max-h-full" v-click-outside="() => (isOpen = false)">
    <div class="p-2 w-full border-b-2 border-slate-700">
      <img src="https://picsum.photos/200/300" alt="avatar" class="h-8 w-8 rounded mx-auto" />
    </div>
    <div class="p-2 h-[calc(100%-110px)] overflow-y-auto no-scrollbar ease-in-out duration-200">
      <SidebarLink :open="isOpen" name="Login" path="/login" icon="login" />
      <SidebarLink :open="isOpen" name="Register" path="/register" icon="register" />
      <SidebarLink
        v-for="route in index.routes"
        :key="route.name"
        :name="route.name"
        :path="route.path"
        :icon="route.icon"
        :open="isOpen"
      />
      <SidebarLink :open="isOpen" name="Logout" path="/logout" icon="logout" />
    </div>
    <div class="w-full h-8 border-t-2 border-slate-700">
      <div class="h-2"></div>
      <Chevron
        class="w-6 h-6 mx-auto cursor-pointer hover:scale-125 focus-visible:scale-125 ease-in-out duration-200"
        :class="{ 'rotate-180': isOpen }"
        @click="isOpen = !isOpen"
      />
    </div>
  </div>
</template>
