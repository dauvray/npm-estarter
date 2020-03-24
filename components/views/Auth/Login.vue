<template>
    <section id="login-page" class="container">
        <h1>Login</h1>
        <div class="row">
            <div class="col-md-6">
                <form>
                    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
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
                        },
                        {
                            type: 'passwordChecker',
                            inputType: 'password',
                            inputName: 'password',
                            label: 'Password',
                            model: 'password',
                            required: true,
                        }
                    ]

                },

                formOptions: {
                    validateAfterLoad: true,
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
                this['auth/login'](this.model)
                .then(response => {
                    if(this.previousPath) {
                        this.$router.push(this.previousPath).catch(err => {})
                    } else {
                        this.$router.push({'name' : 'user_profile'}).catch(err => {})
                    }

                })
            }
        }
    }
</script>
