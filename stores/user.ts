import { defineStore } from 'pinia'

export const useMyUserStore = defineStore({
  id: 'myUserStore',
  state: () => ({
    user: null
  }),
  actions: {
    async setUser(newUserData: any) {
      this.user = newUserData
    }
  },
})
