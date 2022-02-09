import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin'

export default {
    loadNotifications({commit}, userId){
        RestDataSourcesMixin.methods.requestApi(`/get-notifications/${userId}`)
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
        RestDataSourcesMixin.methods.requestApi(`/delete-notification/${notificationId}`)
    }
}
