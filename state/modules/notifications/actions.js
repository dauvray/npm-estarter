import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin'

export default {
    loadNotifications({commit}){
        RestDataSourcesMixin.methods.requestApi(`/get-notifications`)
        .then(response => {
            commit('setNotifications', response)
        })
    },
    pushNotification({commit}, notification){
        return new Promise((resolve, reject) => {
            RestDataSourcesMixin.methods.requestApi(
                '/set-notification',
                'post',
                notification,
            ).then(notification => {
                resolve(notification)
            })
        })
    },
    deleteNotification({commit}, notificationId) {
        new Promise((resolve, reject) => {
            RestDataSourcesMixin.methods.requestApi(`/delete-notification/${notificationId}`)
            .then(resp => {
                if(resp == 'success') {
                    resolve()
                }
            })
        })
    }
}
