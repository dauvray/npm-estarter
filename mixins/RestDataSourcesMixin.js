import Vue from 'vue'
import { EventBus } from 'vuejs-estarter/services/eventBus';

export const RestDataSourcesMixin = {
    methods: {
        requestApi(url = '', method = 'get', data = {}, noty = {err: null, msg: null}) {

            return new Promise( (resolve, reject) => {
                Vue.axios({
                    method: method,
                    url: url,
                    data: data
                })
                .then((response) => {
                    if(response.status == 200){
                        if(noty.msg !== null){
                            EventBus.$emit("httpSuccess", noty.msg)
                        }
                        resolve(response.data)
                    }

                    if(response.status == 204){
                        resolve(response.data)
                    }
                })
                .catch(error => {
                    if (error.response) {
                        if(error.response.status == '404') {
                            EventBus.$emit("httpError", error)
                        }
                        else if(error.response.status == '403') {
                            EventBus.$emit("httpError", 'Accès interdit')
                        }
                        else if(error.response.status == '413') {
                            EventBus.$emit("httpError", 'Fichier trop volumineux')
                        }
                        else if(error.response.status == '401') {
                            document.location.reload()
                        }
                        else if(error.response.status == '419') {
                            document.location.reload()
                        }
                        else {
                            if(error.response.data.error === 'passwords.token') {
                                error.response.data.message = 'Le lien de réinitialisation n\'est plus valide. Veuillez en recréer un.'
                                EventBus.$emit("httpError", error)
                            }
                        }
                    }
                    else if(noty.err !== null){
                        EventBus.$emit("httpError", noty.err)
                    }
                    reject(error);
                })
            });
        }
    }
}
