<template>
    <section id="login-page" class="container">
        <h1>Login</h1>
        <div class="row">
            <div class="col-md-6">
                <form id="login-form">
                    <vue-form-generator ref="loginForm" :schema="schema"
                                        :model="model" :options="formOptions"
                                        @validated="updateValidationFormClasses()"></vue-form-generator>
                    <div class="form-group">
                        <input type="submit" value="Valider" class="btn btn-primary"
                               @click.prevent="loginPost" />
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
    import {BaseMixin} from 'vuejs-estarter/mixins/BaseMixin'
    import {FormMixin} from 'vuejs-estarter/mixins/FormMixin'
    import {EventBus} from "vuejs-eblogger/components/widgets/Comment/Comments";

    export default {
        name: 'Login',
        mixins: [BaseMixin, FormMixin],
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
                            autocomplete: 'off',
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
                    // see in router/index.js
                    let redirect_path = sessionStorage.getItem('redirect_path')
                    if(redirect_path) {
                      //  sessionStorage.removeItem('redirect_path')
                        this.$router.push({'path' : redirect_path}).catch(err => {})
                    } else {
                        this.$router.push({'name' : 'user_profile'}).catch(err => {})
                    }
                }
            }
        },
        methods: {
            ...mapActions([
                'auth/login',
            ]),
            loginPost() {
                this.$refs.loginForm.validate().then( resp => {
                    if(resp.length == 0) {
                        this['auth/login'](this.model)
                        .then(response => {
                            if(response) {
                                let redirect_path = sessionStorage.getItem('redirect_path')

                                // login suite après une navigation interne protégée
                                if(this.previousPath) {
                                    this.$router.push(this.previousPath).catch(err => {})
                                }
                                // login suite a un accès direct via url
                                else if(redirect_path) {
                                    sessionStorage.removeItem('redirect_path')
                                    this.$router.push({'path' : redirect_path}).catch(err => {})
                                }
                                else {
                                    this.$router.push({'name' : 'user_profile'}).catch(err => {})
                                }
                            }
                        })
                    }
                })
            },
            handleError(err) {
                this.serverSideFormErrors(err, this.$refs.loginForm)
            },
        }
    }
</script>
