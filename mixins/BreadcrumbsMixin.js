import {mapActions} from 'vuex'

export default {
    methods: {
        ...mapActions([
            'application/setBreadcrumbs'
        ]),
        generateUrl (route, params = {}) {
            // breadcrumbs
            let words = route.split('/').map( item => {

                // not optional
                if(item.indexOf(':') === -1){
                    return item
                } else {

                    let part = item.replace(':','').replace('?', '')

                    if(params.hasOwnProperty(part)){
                        return this.$route.params[part]
                    }
                }
                return ''
            });
            return words.join('/')
        },
        setBreadcrumb(breadcrumb){
            if(this.$route.meta.hasOwnProperty('parent')){
                let parent = this.$route.meta.parent
                this.$router.options.routes.forEach( item => {
                    if(item.name === parent) {
                        breadcrumb = [ ...item.meta.breadcrumb, ...breadcrumb]
                    }
                })
            }
            this['application/setBreadcrumbs'](breadcrumb)
        }
    },
}
