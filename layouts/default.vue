<template>
  <div class="h-screen px-4 sm:px-8 md:px-10 lg:px-16 pt-4 mx-auto" style="max-width: 1800px">
    <slot class="overflow-x-hidden" />
    <div class="h-16 w-full md:hidden" />
    <Navbar class="fixed bottom-2 inset-x-2 sm:inset-x-4" />
  </div>
</template>
