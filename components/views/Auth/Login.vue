<template>
    <section id="login-page" class="container">
        <h1>Login</h1>
        <div class="row">
            <div class="col-md-6">
                <form id="login-form">
                    <vue-form-generator ref="child" :schema="schema" :model="model" :options="formOptions" @validated="updateValidationFormClasses()"></vue-form-generator>
                    <div class="form-group">
                        <button type="submit" @click.prevent="loginPost" class="btn btn-primary">
                            Valider
                        </button>
                        <router-link :to="{ name: 'password_request', params: {} }">
                            Mot de passe oublié
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>

    import { mapActions, mapGetters} from 'vuex'
    import {BaseMixin} from 'laravel-estarter/mixins/BaseMixin'

    export default {
        name: 'Login',
        mixins: [BaseMixin],
        created() {
            this.setBreadcrumb(this.$route.meta.breadcrumb)
        },
        data() {
            return {
                model: {
                    password: '',
                    email: '',
                    remember: false
                },
                schema: {
                    fields: [
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
                            inputType: 'password',
                            inputName: 'password',
                            label: 'Mot de passe',
                            model: 'password',
                            required: true,
                            validator: ["required"]
                        }
                    ]

                },

                formOptions: {
                    validateAfterLoad: false,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            }
        },
        computed: {
            ...mapGetters({
                loggedIn: 'auth/loggedIn',
                previousPath: 'auth/getPreviousPath'
            }),
        },
        watch: {
            loggedIn: function (newState, oldState) {
                if(newState){
                    this.$router.push({'name' : 'user_profile'});
                }
            }
        },
        methods: {
            ...mapActions([
                'auth/login',
            ]),
            loginPost() {
                this.$refs.child.validate().then( resp => {
                    if(resp.length == 0) {
                        this['auth/login'](this.model)
                        .then(response => {
                            if(this.previousPath) {
                                this.$router.push(this.previousPath).catch(err => {})
                            } else {
                                this.$router.push({'name' : 'user_profile'}).catch(err => {})
                            }
                        })
                    }
                })
            },
            handleError(err) {
                this.$refs.child.clearValidationErrors()
                const errors =  err.response.data.errors;
                for ( const error in errors) {
                    this.$refs.child.errors.push({
                        error: errors[error],
                        field: _.find(this.schema.fields, {'inputName': error})
                    })
                    let el = document.querySelector(`input[name=${error}]`)
                    el.classList.remove("is-valid")
                    el.classList.add("is-invalid")
                }
            },
        }
    }
</script>
