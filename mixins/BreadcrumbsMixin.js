import { mapActions } from 'pinia'
import { useApplicationStore } from '../stores/application.js'


export default {
    methods: {
        ...mapActions(useApplicationStore, [
            'setBreadcrumbs'
        ]),
        generateUrl (route, params = {}) {
            // breadcrumbs
            let words = route.split('/').map( item => {

                // not optional
                if(item.indexOf(':') === -1){
                    return item
                } else {

                    let part = item.replace(':', '').replace('?', '')

                    if(params.hasOwnProperty(part)){
                        return this.$route.params[part]
                    }
                }
                return ''
            });
            return words.join('/')
        },
        setBreadcrumb(breadcrumb){
            this.setBreadcrumbs(breadcrumb)
        }
    },
}
