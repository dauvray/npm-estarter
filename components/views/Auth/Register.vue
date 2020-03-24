<template>
    <section id="register-page" class="container">
        <h1>Register</h1>
        <div class="row">
            <div class="col-md-6">
                <form v-if="!created">

                    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>

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
    import {BaseMixin} from '../../../mixins/BaseMixin'

    export default {
        name: 'Register',
        mixins: [BaseMixin],
        created() {
            this.setBreadcrumb(this.$route.meta.breadcrumb)
        },
        data () {
            return {
                // fieldSet: {
                //     name: '',
                //     email: '',
                //     password: '',
                //     password_confirmation: ''
                // },
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
                            label: 'Password',
                            model: 'password',
                            required: true,
                            isCheckstrength: true,
                            validator: ["required"]
                        },
                        {
                            type: 'passwordChecker',
                            inputName: 'password-confirm',
                            label: 'Confirmation Password',
                            model: 'password_confirmation',
                            required: true,
                            isCheckstrength: false,
                            validator: ["required"]
                        }
                    ]
                },
                formOptions: {
                    validateAfterLoad: false,
                    validateAfterChanged: true,
                    validateAsync: true
                },
               // errors: {},
                created: false
            }
        },
        methods: {
            ...mapActions([
                'auth/registerUser',
            ]),

            submitForm() {
                this['auth/registerUser'](this.model)
            },
            handleSuccess() {
                this.created = true
            }
        }
    }
</script>
