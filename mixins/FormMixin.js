import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import PasswordChecker from "laravel-estarter/components/widgets/form/fields/PasswordComponent"
Vue.component("fieldPasswordChecker", PasswordChecker)
Vue.use(VueFormGenerator)

export const FormMixin = {
    data() {
        return {
            formOptions: {
                validateAfterLoad: false,
                validateAfterChanged: true,
                validateAsync: true
            }
        }
    },
    methods: {
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
                return resp.length == 0
            })
        },
        serverSideFormErrors(err, formRef) {
            formRef.clearValidationErrors()
            const errors = err.response.data.errors;
            for ( const error in errors) {
                formRef.errors.push({
                    error: errors[error][0],
                    field: _.find(this.schema.fields, {'inputName': error})
                })
                let el = document.querySelector(`input[name=${error}]`)
                el.classList.remove("is-valid")
                el.classList.add("is-invalid")
            }
        }
    }
}
