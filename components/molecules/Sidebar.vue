<script setup>
import Logout from '~/assets/icons/logout.svg'
import { useIndexStore } from '~/stores/index'
const index = useIndexStore()
</script>

<template>
  <div class="rounded-xl shadow-gray-xl p-2 bg-slate-800 overflow-y-auto no-scrollbar">
    <div>
      <img src="https://picsum.photos/200/300" alt="avatar" class="h-8 w-8 rounded" />
    </div>
    <SidebarLink name="Login" path="/login" icon="login" />
    <SidebarLink name="Register" path="/register" icon="register" />
    <SidebarLink
      v-for="route in index.routes"
      :key="route.name"
      :name="route.name"
      :path="route.path"
      :icon="route.icon"
    />
    <div class="w-min mx-auto group relative my-6">
      <Logout
        class="group-hover:scale-125 focus-visible:scale-125 ease-in-out duration-200 w-5 h-5 mx-auto cursor-pointer"
      />
      <p
        class="group-hover:block hidden absolute z-[100] w-max left-10 top-0 bg-slate-800/50 px-2 rounded-full shadow-gray"
      >
        Logout
      </p>
    </div>
  </div>
</template>
