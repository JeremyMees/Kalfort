<script setup>
const { pending, data: levels } = useLazyFetch('/api/v1/levels/get_all')
</script>

<template>
  <div class="flex flex-col gap-8 max-h-full p-4">
    <p class="title-normal">Leveling guide</p>
    <div class="max-w-sm border border-slate-700 rounded">
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th>Sessions</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="level in levels" :key="level.level" class="odd:bg-slate-800/30">
            <td class="px-5 sm:px-16">{{ level.sessions_played }}</td>
            <td class="px-5 sm:px-16">{{ level.level }}</td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
