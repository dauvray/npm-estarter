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
        updateValidationFormClasses(formID = null) {
            const formEl = formID != null ? document.getElementById(formID) : document
            setTimeout(function(){
                let errorFields = formEl.querySelectorAll(".form-group.error")
                let validFields = formEl.querySelectorAll(".form-group.valid")
                errorFields.forEach(function(item) {
                    item.querySelector('.form-control').classList.remove('is-valid')
                    item.querySelector('.form-control').classList.add('is-invalid')
                })
                validFields.forEach(function(item) {
                    item.querySelector('.form-control').classList.remove('is-invalid')
                    item.querySelector('.form-control').classList.add('is-valid')
                })
            }, 100);
        },
        isFormValid(formRef) {
            formRef.validate().then(resp => {
                console.log(resp.length == 0)
                return resp.length == 0
            })
        }
    }
}
