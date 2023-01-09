import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin'

export default {
    loadNotifications(){
        return new Promise((resolve, reject) => {
            RestDataSourcesMixin.methods.requestApi(`/get-notifications`)
            .then(notifications => {
                this.items = [...notifications]
                resolve(notifications)
            })
        })
    },
    pushNotification(notification){
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
    deleteNotification(notificationId) {
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
