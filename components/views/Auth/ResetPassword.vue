<template>

    <section id="reset-password-page" class="container">
        <h1>Nouveau mot de passe</h1>
        <div class="row">
            <div class="col-md-6">
                <form v-if="!reseted">
                    <vue-form-generator ref="resetPasswordForm" :schema="schema" :model="model" :options="formOptions"
                                        @validated="updateValidationFormClasses()"></vue-form-generator>

                    <div class="form-group">
                        <input type="submit" value="Valider" @click.prevent="submitForm" class="btn btn-primary" />
                    </div>
                </form>
                <div v-else class="alert alert-success" role="alert">
                    <p>
                        Votre mot de passe a été réinitialisé. Vous pouvez de nouveau vous identifier.
                    </p>
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
    import {FormMixin} from 'laravel-estarter/mixins/FormMixin'

    export default {
        name:'ResetPassword',
        mixins: [BaseMixin, FormMixin],
        data() {
            return {
                model: {
                    email: '',
                    password: '',
                    password_confirmation: ''
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
                reseted: false
            }
        },
        created() {
            this.model.email = this.$route.query.email
            this.setBreadcrumb(this.$route.meta.breadcrumb)
        },
        methods: {
            ...mapActions([
                'auth/resetPassword',
            ]),
            submitForm() {
                this.$refs.resetPasswordForm.validate().then( resp => {
                    if (resp.length == 0) {
                        this['auth/resetPassword'](this.model)
                        .then(response => {
                            if (response.status === 'passwords.reset') {
                                this.reseted = true
                                this.handleSuccess()
                            }
                        })
                    }
                })
            },
            handleError(err) {
                this.serverSideFormErrors(err, this.$refs.resetPasswordForm)
            },
        },
    }
</script>
