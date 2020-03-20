<template>
    <section id="login-page" class="container">
        <h1>Login</h1>
        <div class="row">
            <div class="col-md-6">
                <form id="login-page-form">
                    <fieldset>
                        <legend>Accèdez à votre compte</legend>

                        <div class="form-group" :class="{'has-error' : errors.email}">
                            <label for="email" class="control-label">Email</label>
                            <input type="email"
                                   id="email"
                                   class="form-control"
                                   :class="{'is-invalid' : errors && errors.email }"
                                   placeholder="adresse@e-mail.com"
                                   aria-required="true"
                                   pattern="[^ @]*@[^ @]*\.[a-zA-Z]*"
                                   name="email"
                                   autocomplete='email'
                                   v-model="loginDetails.email"
                                   required autofocus/>
                            <div v-if="errors && errors.email" class="text-danger">{{ errors.email[0] }}</div>
                        </div>
                        <div class="form-group" :class="{'has-error' : errors.password}">
                            <label for="password" class="control-label">Mot de passe</label>
                            <password-component id="password" name="password" :isCheckstrength="false"
                                                v-on:update:password-password="loginDetails.password = $event" />
                            <div v-if="errors && errors.password" class="text-danger">{{ errors.password[0] }}</div>
                        </div>
                        <div class="form-group">
                            <div class="custom-control custom-checkbox">
                                <input id="check-remember-me" type="checkbox" class="custom-control-input"
                                        name="remember" v-model="loginDetails.remember">
                                <label class="custom-control-label" for="check-remember-me">
                                    <span>Remember Me</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="submit" @click.prevent="loginPost" class="btn btn-primary">
                                Valider
                            </button>
                            <router-link :to="{ name: 'password_request', params: {} }">
                                Mot de passe oublié
                            </router-link>
                        </div>
                    </fieldset>
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
        components: {
            PasswordComponent: () => import('laravel-estarter/components/widgets/PasswordComponent')
        },
        created() {
            this.setBreadcrumb(this.$route.meta.breadcrumb)
        },
        data() {
            return {
                loginDetails: {
                    email: '',
                    password: '',
                    remember: false
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
                this['auth/login'](this.loginDetails)
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
