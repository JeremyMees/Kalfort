import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => {
    return {
      players: [],
    }
  },
  actions: {
    async getPlayers() {
      this.players = await axios.get('players')
    },
  },
})
