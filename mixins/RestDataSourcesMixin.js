
import EventBus from 'vuejs-estarter/services/eventBus';

const EmitEvent = (event, data, toaster, defaultLabel = '') => {

    const toasterTxt = event === 'httpSuccess' ? toaster.msg : toaster.err
    const defaultTxt = typeof data === 'string' ? data : defaultLabel

    EventBus.$emit(
        event,
        toasterTxt || data.message || defaultTxt,
        toaster.options || data.options || {},
        data.errors || {}
    )
}

export const RestDataSourcesMixin = {
    inject: ['AWN'],
    methods: {
        requestApi(url = '', method = 'get', data = {}, toaster = {err: null, msg: null, options: null}, headers = {}) {

            return new Promise( (resolve, reject) => {
                axios({
                    method: method,
                    url: url,
                    data: data,
                    headers: headers,
                })
                .then((response) => {
                    console.log(response)
                    if( response.status == 200 && response.data.hasOwnProperty('message') ){
                        EmitEvent("httpSuccess", response.data, toaster)
                    }
/*                     if(response.status == 204){
                        resolve(response.data)
                    } */

                    resolve(response.data)
                })
                .catch(error => {
                    if (error.response) {
                        if(error.response.status == '404') {
                            EmitEvent("httpError", error.response.data, toaster, 'Element introuvable')
                        }
                        else if(error.response.status == '403') {
                            EmitEvent("httpError", error.response.data, toaster, 'Accès interdit')
                        }
                        else if(error.response.status == '413') {
                            EmitEvent("httpError", error.response.data, toaster, 'Fichier trop volumineux')
                        }
                        else if(error.response.status == '401') {
                            document.location.reload()
                        }
                        else if(error.response.status == '419') {
                            document.location.reload()
                        }
                        else if(error.response.status == '422') {
                            EmitEvent("httpError", error.response.data, toaster)
                        }
                        else if(error.response.status == '500') {
                            EmitEvent("httpError", error.response.data, toaster)
                        }
                        else if(error.response.status == '302') {
                            window.location.href = error.response.data
                        }
                        else {
                            if(error.response.data.error === 'passwords.token') {
                                error.response.data.message = 'Le lien de réinitialisation n\'est plus valide. Veuillez en recréer un.'
                                EmitEvent("httpError", error.response.data, toaster)
                            }
                        }
                    }
                    else if(toaster.err !== null){
                        EventBus.$emit("httpError", toaster.err)
                    }
                    reject(error);
                })
            });
        }
    }
}
