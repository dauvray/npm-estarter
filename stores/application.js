import actionsApplication from './application/actions'
import gettersApplication from './application/getters'
import originalState from './application/state'

import { defineStore } from 'pinia'

export const useApplicationStore = defineStore('application', {
  state: originalState,
  getters: gettersApplication,
  actions: actionsApplication,
})
