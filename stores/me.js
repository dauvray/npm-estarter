import originalState from './me/state.js'
import actionsMe from './me/actions.js'
import gettersMe from './me/getters.js'

import { defineStore } from 'pinia'

export const useMeStore = defineStore('me', {
  state: originalState,
  getters: gettersMe,
  actions: actionsMe,
})
