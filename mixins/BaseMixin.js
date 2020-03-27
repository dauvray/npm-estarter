import breadcrumbs from 'vuejs-estarter/mixins/BreadcrumbsMixin'
import MetaDescription from 'vuejs-estarter/mixins/MetaDescriptionMixin'
import {AuthorizationMixin} from 'vuejs-estarter/mixins/AuthorizationMixin'
import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin'

export const BaseMixin = {
    mixins: [
        breadcrumbs,
        MetaDescription,
        AuthorizationMixin,
        RestDataSourcesMixin
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
    },
    methods: {
        // event bus methods
        handleError(err) {
            this.errors = err.response.data.errors
        },
        handleSuccess() {
            this.errors = {}
        }
    }
}
