
export const state = {
    breadcrumbs: []

}

export const getters = {
    getBreadcrumbs(state) {
        return state.breadcrumbs
    }
}

export const mutations = {
    setBreadcrumbs(state, obj) {
        state.breadcrumbs = [...obj]
    },
}

export const actions = {
    setBreadcrumbs({ commit}, breadcrumb) {
        commit('setBreadcrumbs', breadcrumb)
    }
}
