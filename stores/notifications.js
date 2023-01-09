import actionsNotifications from './notifications/actions'
import gettersNotifications from './notifications/getters'
import originalState from './notifications/state'

import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: originalState,
  getters: gettersNotifications,
  actions: actionsNotifications,
})
