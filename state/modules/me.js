import actionsMe from './me/actions'
import mutationsMe from './me/mutations'
import gettersMe from './me/getters'
import originalState from './me/state'

export const state = originalState()
export const actions = actionsMe
export const getters = gettersMe
export const mutations = mutationsMe
