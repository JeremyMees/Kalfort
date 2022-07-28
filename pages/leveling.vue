<script setup>
definePageMeta({ middleware: 'auth' })

const supabase = useSupabaseClient()
const router = useRouter()

const { data: levels } = await useAsyncData('levels', async () => {
  const { data, error } = await supabase.from('levels').select('*').order('level')
  if (error) router.push({ path: '/' })
  else return data
})
</script>

<template>
  <div v-if="!levels" class="title-normal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading ...</div>
  <div v-else class="flex flex-col gap-8 max-h-full p-4">
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
