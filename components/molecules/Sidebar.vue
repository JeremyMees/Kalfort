<script setup>
import { useIndexStore } from '~/stores/index'
const index = useIndexStore()
</script>

<template>
  <div class="rounded-xl shadow-gray-xl bg-slate-700 flex flex-col max-h-full min-w-[60px]">
    <div class="p-2 w-full border-b-2 border-slate-600">
      <img src="https://picsum.photos/200/300" alt="avatar" class="h-8 w-8 rounded mx-auto" />
    </div>
    <div class="p-2 h-[calc(100%-110px)] overflow-y-auto no-scrollbar ease-in-out duration-200">
      <SidebarLink name="Login" path="/login" icon="login" />
      <SidebarLink name="Register" path="/register" icon="register" />
      <SidebarLink
        v-for="route in index.routes"
        :key="route.name"
        :name="route.name"
        :path="route.path"
        :icon="route.icon"
      />
      <SidebarLink name="Logout" path="/logout" icon="logout" />
    </div>
  </div>
</template>
