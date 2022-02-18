import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin'

export default {
    loadMe({commit}) {
        RestDataSourcesMixin.methods.requestApi(`/get-user-data`)
        .then( resp => {
            commit('setMe', resp.user)
        })
    }
}
