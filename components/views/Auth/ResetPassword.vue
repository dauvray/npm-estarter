<template>

    <section id="reset-password-page" class="container">
        <h1>Nouveau mot de passe</h1>
        <div class="row">
            <div class="col-6">
                <form v-if="!reseted">
                    <fieldset>
                        <legend>Choisir un nouveau mot de passe</legend>

                        <div class="form-group" v-bind:class="{'has-error' : errors.email}">
                            <label for="email" class="col-md-4 control-label">
                                Email  <span class='required'>*</span>
                            </label>
                            <input id="email"
                                   type="text"
                                   class="form-control"
                                   name="email"
                                   autocomplete='email'
                                   v-model="fieldSet.email"
                                   required
                                   autofocus />
                            <div v-if="errors && errors.email" class="text-danger">{{ errors.email[0] }}</div>
                        </div>

                        <div class="form-group" v-bind:class="{'has-error' : errors.password}">
                            <label for="password" class="col-md-4 control-label">
                                Mot de passe  <span class='required'>*</span>
                            </label>
                            <div class="form-group">
                                <password-component id="password" name="password"
                                                    v-on:update:password-password="fieldSet.password = $event" />
                            </div>
                            <div v-if="errors && errors.password" class="text-danger">{{ errors.password[0] }}</div>
                        </div>

                        <div class="form-group">
                            <label for="password-confirm" class="col-md-4 control-label">
                                Confirmation du mot de passe  <span class='required'>*</span>
                            </label>
                            <div class="form-group">
                                <password-component id="password-confirm" name="password-confirm" v-bind:is-checkstrength="false"
                                                    v-on:update:password-password-confirm="fieldSet.password_confirmation = $event" />
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <input type="submit" value="Valider" @click.prevent="submitForm" class="btn btn-primary" />
                            </div>
                        </div>

                    </fieldset>
                </form>
                <div v-if="reseted" class="alert alert-success" role="alert">
                    Votre mot de passe a été réinitialisé. Vous pouvez de nouveau vous identifier.
                    <p>
                        <router-link :to="$estarterRoutes.login">Connexion</router-link>
                    </p>
                </div>
            </div>
        </div>
    </section>

</template>

<script>

    import { mapActions } from 'vuex'
    import {BaseMixin} from 'laravel-estarter/mixins/BaseMixin'

    export default {
        name:'ResetPassword',
        mixins: [BaseMixin],
        components: {
            PasswordComponent: () => import('laravel-estarter/components/widgets/PasswordComponent')
        },
        data() {
            return {
                fieldSet: {
                    email: '',
                    password: '',
                    password_confirmation: '',
                    token: null
                },
                reseted: false
            }
        },
        created() {
            this.fieldSet.email = this.$route.query.email
            this.fieldSet.token = this.$route.params.token
            this.setBreadcrumb(this.$route.meta.breadcrumb)
        },
        methods: {
            ...mapActions([
                'auth/resetPassword',
            ]),
            submitForm() {
                this['auth/resetPassword'](this.fieldSet)
                .then(response => {

                    if(response.status === 'passwords.reset') {
                        this.reseted = true
                        this.handleSuccess()
                    }
                })
            }
        },
    }
</script>
