<script setup>
import Chevron from '~/assets/icons/chevron.svg'
import Delete from '~/assets/icons/delete.svg'

definePageMeta({ middleware: 'auth' })

const user = useSupabaseUser()
const planning = ref()
const activeIndex = ref(0)
const selectedOptions = ref()

onMounted(() => getData())

async function signUp(session, index) {
  const cel = numberToString(session.split('_')[1]) + getCelNumberEmptyCell(session, index)
  const apply = await $fetch('/api/v1/planning/join_session', { method: 'POST', body: { cel, value: user.value.user_metadata.name } })
  if (apply) {
    planning.value = null
    getData()
  }
}

async function removeSignup(session, index) {
  const cel = numberToString(session.split('_')[1]) + getCelNumberAssignedCell(session, index)
  const apply = await $fetch('/api/v1/planning/leave_session', { method: 'POST', body: { cel, value: '' } })
  if (apply) {
    planning.value = null
    getData()
  }
}

async function getData() {
  const data = await $fetch('/api/v1/planning/get_planning')
  const transformedData = transformSheet(data)
  selectedOptions.value = Object.keys(transformedData.sessions)
  activeIndex.value = Object.keys(transformedData.sessions).length - 1
  planning.value = transformedData
}

function checkIfOldDate(date) {
  const transformedDate = new Date(
    date.split('_')[1].concat(`/${new Date().getFullYear()}`).split('/').reverse().join('/')
  )
  return transformedDate > new Date()
}

// calculates the nnumber of the first empty cell
function getCelNumberEmptyCell(session, index) {
  const maxPlayers = planning.value.sessions[session][index].maxPlayers
  const players = planning.value.sessions[session][index].players.filter(player => player !== '').length
  if (maxPlayers - players === 0) return
  let number = 3
  for (let i = 1; i < Number(index.split('_')[1]); i++) {
    number = number + planning.value.sessions[session][`date_${i}`].players.length + 1
  }
  return number + planning.value.sessions[session][index].players.indexOf('')
}

// calculates the nnumber of the cell thats assigned to you 
function getCelNumberAssignedCell(session, index) {
  let number = 3
  for (let i = 1; i < Number(index.split('_')[1]); i++) {
    number = number + planning.value.sessions[session][`date_${i}`].players.length + 1
  }
  return number + planning.value.sessions[session][index].players.indexOf(user.value.user_metadata.name)
}

// checks if player already joined the session
function playerAssignedSession(session) {
  const players = []
  for (let i = 0; i < Object.keys(planning.value.sessions[session]).length; i++) {
  players.push(planning.value.sessions[session][`date_${i + 1}`].players)
  }
return players.flat().indexOf(user.value.user_metadata.name) < 0 ? false : true
}
</script>

<template>
  <div v-if="!planning" class="title-normal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    Loading ...
  </div>
  <div v-else class="flex flex-col gap-8 p-4 xl:pb-4">
    <p class="title-normal">Planning</p>
    <div class="border border-slate-700 rounded flex flex-col">
      <div class="flex items-center gap-5 justify-center bg-slate-800/30 p-4">
        <Chevron
          class="w-5 cursor-pointer hover:scale-125 focus-visible:scale-125 ease-in-out duration-200 rotate-180"
          :class="{ 'pointer-events-none opacity-30': activeIndex === 0 }"
          @click="activeIndex--"
        />
        <p class="title-subtle">{{ selectedOptions[activeIndex].replaceAll('_', ' ') }}</p>
        <Chevron
          class="w-5 cursor-pointer hover:scale-125 focus-visible:scale-125 ease-in-out duration-200"
          :class="{ 'pointer-events-none opacity-30': selectedOptions.length - 1 === activeIndex }"
          @click="activeIndex++"
        />
      </div>
      <div class="flex flex-col md:gap-0 md:flex-row">
        <div
          v-for="(session, index) in planning.sessions[selectedOptions[activeIndex]]"
          :key="session.day"
          class="grow"
        >
          <div class="flex flex-col">
            <div class="py-4 text-center call-to-action border-y border-slate-700">
              {{ session.day.replaceAll('_', ' ') }}
            </div>
            <div
              v-for="player in session.players.filter(player => player !== '')"
              :key="player"
              class="mx-auto body-small even:bg-slate-800/30 py-2 flex gap-2"
            >
              <p>{{ player }}</p>
              <VDropdown v-if="player === user.user_metadata.name && checkIfOldDate(session.day)">
                  <button>
                    <Delete class="w-6 h-6 text-red-400"/>
                  </button>
                  <template #popper>
                    <div class="flex flex-row gap-4 p-4">
                      <Button color="danger" @click="removeSignup(selectedOptions[activeIndex], index)" v-close-popper> Remove </Button>
                      <Button v-close-popper> Cancel </Button>
                    </div>
                  </template>
                </VDropdown>
            </div>
            <div v-if="session.maxPlayers - session.players.filter(player => player !== '').length > 0">
              <div
                v-for="spot in session.maxPlayers - session.players.filter(player => player !== '').length"
                :key="spot"
                class="text-center body-small py-2"
              >
              <div v-if="!playerAssignedSession(selectedOptions[activeIndex])">
                <VDropdown v-if="checkIfOldDate(session.day)">
                  <button
                    class="text-indigo-400 ring-indigo-200 outline-none focus-visible:ring active:scale-110 ease-in-out duration-300"
                  >
                    Free spot
                  </button>
                  <template #popper>
                    <div class="flex flex-row gap-4 p-4">
                      <Button @click="signUp(selectedOptions[activeIndex], index)" v-close-popper> Join </Button>
                      <Button color="danger" v-close-popper> Cancel </Button>
                    </div>
                  </template>
                </VDropdown>
              </div>
              <div v-else>
                ...
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
