import actionsNotifications from './notifications/actions'
import mutationsNotifications from './notifications/mutations'
import gettersNotifications from './notifications/getters'
import originalState from './notifications/state'

export const state = originalState()
export const actions = actionsNotifications
export const getters = gettersNotifications
export const mutations = mutationsNotifications
