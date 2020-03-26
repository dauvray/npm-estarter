import breadcrumbs from 'laravel-estarter/mixins/BreadcrumbsMixin'
import MetaDescription from 'laravel-estarter/mixins/MetaDescriptionMixin'
import {AuthorizationMixin} from 'laravel-estarter/mixins/AuthorizationMixin'
import {RestDataSourcesMixin} from 'laravel-estarter/mixins/RestDataSourcesMixin'

import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
//import 'vue-form-generator/dist/vfg.css'
import PasswordChecker from "laravel-estarter/components/widgets/form/fields/PasswordComponent"
Vue.component("fieldPasswordChecker", PasswordChecker)
Vue.use(VueFormGenerator)

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
        },
        isValidForm(formId) {

            this.$refs.child.validate()

            if (document
                .getElementById(formId)
                .querySelectorAll(".is-invalid").length > 0)
            {
                return false
            }

            if (document
                .getElementById(formId)
                .querySelectorAll(".is-valid").length == 0)
            {
                return false
            }

            return true
        }
    }
}
