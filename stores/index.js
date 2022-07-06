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
      levels: [
        { level: 0, sessions: 0 },
        { level: 1, sessions: 1 },
        { level: 2, sessions: 3 },
        { level: 3, sessions: 5 },
        { level: 4, sessions: 8 },
        { level: 5, sessions: 11 },
        { level: 6, sessions: 14 },
        { level: 7, sessions: 18 },
        { level: 8, sessions: 22 },
        { level: 9, sessions: 26 },
        { level: 10, sessions: 30 },
      ],
      user: null,
    }
  },
})
