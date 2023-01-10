import Breadcrumbs from 'vuejs-estarter/mixins/BreadcrumbsMixin'
/* import MetaDescription from 'vuejs-estarter/mixins/MetaDescriptionMixin'
import {AuthorizationMixin} from 'vuejs-estarter/mixins/AuthorizationMixin'
import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin' */

export const BaseMixin = {
    mixins: [
        Breadcrumbs,
     //   MetaDescription,
      //  AuthorizationMixin,
      //  RestDataSourcesMixin
    ],
    inject: ["eventBus"],
    data () {
        return {
            errors: {},
        }
    },
    created() {
        this.eventBus.$on("httpError", this.handleError)
        this.eventBus.$on("httpSuccess", this.handleSuccess)
        this.eventBus.$on("httpNotFound", this.handleNotFound)
    },
    methods: {
        // event bus methods
        handleError(err) {
            this.errors = err.response.data.errors
        },
        handleSuccess() {
            this.errors = {}
        },
        handleNotFound() {
            this.$router.push({name: '404'}).catch(err => {})
        }
    }
}
