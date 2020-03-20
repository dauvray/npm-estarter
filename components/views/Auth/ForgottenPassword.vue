<template>

    <section id="forgotten-password-page" class=" container">
        <h1>Mot de passe oublié</h1>
        <div class="row">
            <div class="col-6">
                <div v-if="sentResetLink">
                    <div class="alert alert-success" role="alert">
                        Un email vient de vous être envoyé afin de réinitialiser votre mot de passe
                    </div>
                </div>

                <form v-else>
                    <fieldset>
                        <legend>Obtenir un lien de réinitialisation</legend>

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
                                   v-model="email"
                                   required autofocus/>
                            <div v-if="errors && errors.email" class="text-danger">{{ errors.email[0] }}</div>
                        </div>

                        <div class="form-group">
                            <button type="submit" @click.prevent="postEmail" class="btn btn-primary">
                                Valider
                            </button>
                        </div>

                    </fieldset>
                </form>
            </div>
        </div>
    </section>

</template>

<script>

    import { mapActions } from 'vuex'
    import {BaseMixin} from 'laravel-estarter/mixins/BaseMixin'

    export default {
        name: 'ForgottenPassword',
        mixins: [BaseMixin],
        data() {
            return {
                email: null,
                sentResetLink: false
            }
        },
        created() {
            this.setBreadcrumb(this.$route.meta.breadcrumb)
        },
        methods: {
            ...mapActions([
                'auth/forgottenPasword',
            ]),
            postEmail() {
                this['auth/forgottenPasword']({"email": this.email})
                .then(response => {
                    if(response.status === "passwords.sent") {
                        this.sentResetLink = true
                        this.errors = {}
                    }
                })
            }
        }
    }
</script>
