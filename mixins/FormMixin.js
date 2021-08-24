import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import PasswordChecker from "../components/widgets/form/fields/PasswordComponent.vue"
import GeocoderComponent from "../components/widgets/form/fields/GeocoderComponent.vue"
Vue.component("fieldPasswordChecker", PasswordChecker)
Vue.component("fieldGeocoderComponent", GeocoderComponent)

VueFormGenerator.validators.resources.fieldIsRequired = "Ce champ est obligatoire"
VueFormGenerator.validators.resources.invalidFormat = "Format invalide"
VueFormGenerator.validators.resources.numberTooSmall = "Le nombre est trop petit, minimum: {0}"
VueFormGenerator.validators.resources.numberTooBig = "Le nombre est trop grand, maximum: {0}"
VueFormGenerator.validators.resources.invalidNumber = "Nombre invalide"
VueFormGenerator.validators.resources.invalidInteger = "La valeur attendue est un nombre"
VueFormGenerator.validators.resources.textTooSmall = "Le texte est trop court. Actuel: {0}, Minimum: {1}"
VueFormGenerator.validators.resources.textTooBig = "Le texte est trop long. Actuel: {0}, Maximum: {1}"
VueFormGenerator.validators.resources.thisNotText = "Texte attendu"
VueFormGenerator.validators.resources.thisNotArray = "Tableau attendu"
VueFormGenerator.validators.resources.selectMinItems = "Sélectionnez au moins {0} éléments"
VueFormGenerator.validators.resources.selectMaxItems = "Sélectionnez au maximum {0} éléments"
VueFormGenerator.validators.resources.invalidDate = "Date invalide"
VueFormGenerator.validators.resources.dateIsEarly = "La date est trop proche. Actuelle: {0}, Minimum: {1}"
VueFormGenerator.validators.resources.dateIsLate = "La date est trop éloignée. Actuelle: {0}, Maximum: {1}"
VueFormGenerator.validators.resources.invalidEmail = "Format d'email invalide"
VueFormGenerator.validators.resources.invalidURL = "URL invalide"
VueFormGenerator.validators.resources.invalidCard = "Format de carte invalide"
VueFormGenerator.validators.resources.invalidCardNumber = "Numéro de carte invalide"
VueFormGenerator.validators.resources.invalidTextContainNumber = "Texte invalide, ne peut contenir de chiffre ou de caractères spéciaux"
VueFormGenerator.validators.resources.invalidTextContainSpec = "Texte invalide, ne peut contenir de caractères spéciaux"
Vue.use(VueFormGenerator)

export const FormMixin = {
    data() {
        return {
            formOptions: {
                validateAfterLoad: false,
                validateAfterChanged: true,
                validateAsync: true
            },
            model: {},
            schema: {
                fields: []
            },
            isFormValidated: false,
            uid: `${Math.floor(Math.random() * Date.now())}`,
        }
    },
    mounted: function() {
        document.querySelectorAll('.form-group').forEach(function(item) {
            item.classList.remove('valid')
        })
    },
    methods: {
        updateValidationFormClasses(formID = null) {
            const formEl = formID != null ? document.getElementById(formID) : document
            setTimeout(function(){
                let errorFields = formEl.querySelectorAll(".form-group.error")
                let validFields = formEl.querySelectorAll(".form-group.valid")
                errorFields.forEach(function(item) {
                    if(item.querySelector('.form-control')){
                        item.querySelector('.form-control').classList.remove('is-valid')
                        item.querySelector('.form-control').classList.add('is-invalid')
                    }
                })
                validFields.forEach(function(item) {
                    if(item.querySelector('.form-control')) {
                        item.querySelector('.form-control').classList.remove('is-invalid')
                        item.querySelector('.form-control').classList.add('is-valid')
                    }
                })
            }, 100);
        },
        isFormValid(formRef) {
            formRef.validate().then(resp => {
                return resp.length == 0
            })
        },
        onValidated(isValid, fieldErrors) {
            this.isFormValidated = isValid
            this.$emit('field-validated', isValid)
        },
        serverSideFormErrors(err, formRef) {
            if (formRef !== undefined) {
                formRef.clearValidationErrors()
                const errors = err.response.data.errors;
                for (const error in errors) {
                    formRef.errors.push({
                        error: errors[error][0],
                        field: _.find(this.schema.fields, {'inputName': error})
                    })
                    let el = document.querySelector(`input[name=${error}]`)
                    el.classList.remove("is-valid")
                    el.classList.add("is-invalid")
                }
            }
        },
        onUpdatedModel(newVal, schema) {
            this.$emit("model-updated", newVal, schema)
        },
        onSaveModalChanges() {
            this.model = {}
        }
    }
}
