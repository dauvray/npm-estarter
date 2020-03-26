<template>
    <section id="register-page" class="container">
        <h1>Register</h1>
        <div class="row">
            <div class="col-md-6">
                <form v-if="!created">

                    <vue-form-generator ref="registerForm" :schema="schema" :model="model" :options="formOptions"
                                        @validated="updateValidationFormClasses()"></vue-form-generator>

                    <div class="form-group">
                        <div class="flot-right">
                            <input type="submit" value="Valider" @click.prevent="submitForm" class="btn btn-primary" />
                        </div>
                    </div>

                </form>

                <div v-if="created">
                    <div class="alert alert-success" role="alert">
                        Creation de compte validée.
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import { mapActions, mapGetters} from 'vuex'
    import {BaseMixin} from 'laravel-estarter/mixins/BaseMixin'
    import {FormMixin} from 'laravel-estarter/mixins/FormMixin'

    export default {
        name: 'Register',
        mixins: [BaseMixin, FormMixin],
        created() {
            this.setBreadcrumb(this.$route.meta.breadcrumb)
        },
        data () {
            return {
                model: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                schema: {
                    fields: [
                        {
                            type: 'input',
                            inputType: 'text',
                            label: 'Nom',
                            model: 'name',
                            required: true,
                            validator: ["required"]
                        },
                        {
                            type: 'input',
                            inputType: 'email',
                            inputName: 'email',
                            label: 'Email',
                            model: 'email',
                            placeholder: 'email@exemple.com',
                            required: true,
                            validator: ["email"]
                        },
                        {
                            type: 'passwordChecker',
                            inputName: 'password',
                            label: 'Mot de passe',
                            model: 'password',
                            required: true,
                            isCheckstrength: true,
                            validator: ["required"]
                        },
                        {
                            type: 'passwordChecker',
                            inputName: 'password-confirm',
                            label: 'Confirmation du mot de passe',
                            model: 'password_confirmation',
                            required: true,
                            isCheckstrength: false,
                            validator: ["required"]
                        }
                    ]
                },
                created: false
            }
        },
        methods: {
            ...mapActions([
                'auth/registerUser',
            ]),
            submitForm() {
                this.$refs.registerForm.validate().then( resp => {
                    if (resp.length == 0) {
                        this['auth/registerUser'](this.model)
                    }
                })
            },
            handleSuccess() {
                this.created = true
            },
            handleError(err) {
                this.serverSideFormErrors(err, this.$refs.registerForm)
            },
        }
    }
</script>
