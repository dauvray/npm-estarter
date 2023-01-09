import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin'

export default {
    loadMe() {
        RestDataSourcesMixin.methods.requestApi(`/get-user-data`)
        .then( resp => {
            this.$patch({...resp.user})
        })
    },
    // add data from other packages
    composeMe(user) {
        this.$patch({...user})
    }
}
