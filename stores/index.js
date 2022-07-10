import { defineStore } from 'pinia'

export const useIndexStore = defineStore('index', {
  state: () => {
    return {
      routes: [
        { path: '/', name: 'Home', icon: 'home' },
        { path: 'planning', name: 'Planning', icon: 'calendar' },
        { path: 'characters', name: 'Characters', icon: 'character' },
        { path: 'players', name: 'Players', icon: 'players' },
        { path: 'dungeon-masters', name: 'Dungeon Masters', icon: 'dms' },
        { path: 'achievements', name: 'Achievements', icon: 'achievement' },
        { path: 'leaderboards', name: 'Leaderboards', icon: 'leaderboards' },
        { path: 'leveling', name: 'Leveling', icon: 'level' },
        { path: 'profile', name: 'Profile', icon: 'profile' },
      ],
    }
  },
})
