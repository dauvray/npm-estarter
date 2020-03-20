<template>
    <section id="register-page" class="container">
        <h1>Register</h1>
        <div class="row">
            <div class="col-6">
                <form v-if="!created">
                    <fieldset>
                        <legend>Créez votre compte</legend>

                        <div class="form-group" v-bind:class="{'has-error' : errors.name}">
                            <label for="name" class="control-label">
                                Nom  <span class='required'>*</span>
                            </label>
                            <input id="name"
                                   type="text"
                                   class="form-control"
                                   :class="{'is-invalid' : errors && errors.name }"
                                   name="name"
                                   autocomplete='name'
                                   v-model="fieldSet.name"
                                   required
                                   autofocus />
                            <div v-if="errors && errors.name" class="text-danger">{{ errors.name[0] }}</div>
                        </div>

                        <div class="form-group" v-bind:class="{'has-error' : errors.email}">
                            <label for="email" class="control-label">
                                Email  <span class='required'>*</span>
                            </label>
                            <input id="email"
                                   type="email"
                                   class="form-control"
                                   :class="{'is-invalid' : errors && errors.email }"
                                   name="email"
                                   placeholder="adresse@e-mail.com"
                                   aria-required="true"
                                   pattern="[^ @]*@[^ @]*\.[a-zA-Z]*"
                                   v-model="fieldSet.email"
                                   autocomplete='email'
                                   required />
                            <div v-if="errors && errors.email" class="text-danger">{{ errors.email[0] }}</div>
                        </div>

                        <div class="form-group" v-bind:class="{'has-error' : errors.password}">
                            <label for="password" class="control-label">
                                Mot de passe  <span class='required'>*</span>
                            </label>
                            <div class="form-group">
                                <password-component id="password" name="password"
                                                    v-on:update:password-password="fieldSet.password = $event" />
                                <div v-if="errors && errors.password" class="text-danger">{{ errors.password[0] }}</div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password-confirm" class="control-label">
                                Confirmation du mot de passe  <span class='required'>*</span>
                            </label>
                            <div class="form-group">
                                <password-component id="password-confirm" name="password-confirm" v-bind:is-checkstrength="false"
                                                    v-on:update:password-password-confirm="fieldSet.password_confirmation = $event" />
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="flot-right">
                                <input type="submit" value="Valider" @click.prevent="submitForm" class="btn btn-primary" />
                            </div>
                        </div>

                    </fieldset>
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
        components: {
            PasswordComponent: () => import('laravel-estarter/components/widgets/PasswordComponent')
        },
        created() {
            this.setBreadcrumb(this.$route.meta.breadcrumb)
        },
        data () {
            return {
                fieldSet: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                errors: {},
                created: false
            }
        },
        methods: {
            ...mapActions([
                'auth/registerUser',
            ]),

            submitForm() {
                this['auth/registerUser'](this.fieldSet)
            },
            handleSuccess() {
                this.created = true
            },
        }
    }
</script>
