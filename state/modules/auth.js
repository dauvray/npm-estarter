import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin'

export const state = {
    user: {},                   // main user
    previousPath: null,          // previous page before login
    isLoggedin: false,
}

export const getters = {
    loggedIn(state) {
        return state.isLoggedin
    },
    getToken(state) {
        return state.accessToken
    },
    getUser(state) {
        return state.user
    },
    getPreviousPath(state) {
        return state.previousPath
    }
}

export const mutations = {
    setLogin(state, status) {
        state.isLoggedin = status;
    },
    setLogout(state) {
        state.isLoggedin = false;
        state.user = {};
        state.tmpUserFields = {};
    },
    retrieveUser(state, user) {
        state.user = user;
        state.tmpUserFields = {...user};
    },
    setPreviousPath(state, path) {
        state.previousPath = path
    },
    setUserConnectionStatus(state, status) {
        state.isLoggedin = status
    }
}

export const actions = {

    async checkUser({commit}){
        let response = await RestDataSourcesMixin.methods.requestApi(`/check-user`)
        commit('setUserConnectionStatus', response.status)
        return response.status
    },

    async login(context, credentials){
        await RestDataSourcesMixin.methods.requestApi('/airlock/csrf-cookie')
        await RestDataSourcesMixin.methods.requestApi(`${this._vm.$estarterRoutes.login}`,
            'post', credentials, {err: null, msg: null})

        let response = RestDataSourcesMixin.methods.requestApi(`${this._vm.$estarterRoutes.user_profile}`,
            'get', null, {err: 'Identification impossible', msg: 'Connexion établie'})
            .then(resp => {
                context.commit('setLogin', true)
                context.commit('retrieveUser', resp.user)
            })

        return response
    },

    async logout({ commit, state }){
        let response = await RestDataSourcesMixin.methods.requestApi(`${this._vm.$estarterRoutes.logout}`)
       commit('setLogout');
       return response
    },

    async retrieveUser({ commit, state }){
        let response = await RestDataSourcesMixin.methods.requestApi(`${this._vm.$estarterRoutes.user_profile}`,
            'get', null, {err: 'Identification impossible', msg: 'Connexion établie'})
        commit('retrieveUser', response.user)
        return response
    },

    async updateUser({ commit, state }, data){
        let user = await RestDataSourcesMixin.methods.requestApi(`${this._vm.$estarterRoutes.user_update}`,
            'post', data, {err: 'Mise à jour impossible', msg: 'Mise à jour enregistrée'})
        commit('retrieveUser', user)
        return response
    },

    async deleteUser({ commit}){
        let response = await RestDataSourcesMixin.methods.requestApi(`${this._vm.$estarterRoutes.user_delete}`)
        if(response.status === "ok"){
            commit('destroyToken')
        }
        return response
    },

    async registerUser(context, data){
        let response = await RestDataSourcesMixin.methods.requestApi(`${this._vm.$estarterRoutes.register}`,
            'post', data, {
                err: 'Une erreur s\'est produite.',
                msg: 'Un email vous a été envoyé. Veuillez confirmer votre inscription'
            })
        return response
    },

    async confirmInscription(context, token){
        let response = await RestDataSourcesMixin.methods.requestApi(`${this._vm.$estarterRoutes.user_confirm_inscription}/${token}`)
        return response
    },

    async forgottenPasword({ commit }, data){
        let response = await RestDataSourcesMixin.methods.requestApi(`${this._vm.$estarterRoutes.password_email}`,
            'post', data)
        commit('retrieveUser', response)
        return response
    },

    async resetPassword(context, data){
        let response = await RestDataSourcesMixin.methods.requestApi(`${this._vm.$estarterRoutes.password_update}`,
            'post', data)
        return response
    },

    setPreviousPath({ commit }, path) {
        commit('setPreviousPath', path)
    }
}
