<script setup>
import { useIndexStore } from '~/stores/index'
const index = useIndexStore()
</script>

<template>
  <div class="flex flex-col gap-8 max-h-full p-4">
    <p class="title-normal">Leveling guide</p>
    <!-- <div class="body-normal flex gap-y-4 gap-x-8 border border-slate-700 rounded p-5 shadow-gray w-min">
      <div class="flex flex-col">
        <div class="font-bold">Sessions</div>
        <div v-for="level in index.levels" :key="level.level" class="text-right">
          {{ level.sessions }}
        </div>
      </div>
      <div class="flex flex-col">
        <div class="font-bold">Level</div>
        <div v-for="level in index.levels" :key="level.level" class="text-right">{{ level.level }}</div>
      </div>
    </div> -->
    <div class="max-w-sm border border-slate-700 rounded">
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th>Sessions</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="level in index.levels" :key="level.level" class="odd:bg-slate-800/30">
            <td class="px-5 sm:px-16">{{ level.sessions }}</td>
            <td class="px-5 sm:px-16">{{ level.level }}</td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
