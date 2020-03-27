<template>
    <div class="card">
        <div class="card-header">
            <h3>Mon compte</h3>
        </div>
        <div class="card-body">
            <form @submit.prevent="updateProfile">
                <vue-form-generator ref="updateProfileForm" :schema="schema"
                    :model="model" :options="formOptions"
                    @validated="updateValidationFormClasses()"></vue-form-generator>
                <input type="button" class="btn btn-warning" value="Annuler" @click="cancelUpdate" />
                <input type="submit" class="btn btn-success" value="Envoyer" />
            </form>
        </div>
    </div>
</template>

<script>

    import { mapActions, mapGetters} from 'vuex'
    import {BaseMixin} from 'vuejs-estarter/mixins/BaseMixin'
    import {FormMixin} from 'vuejs-estarter/mixins/FormMixin'

    export default {
        name: 'UpdateProfile',
        mixins: [BaseMixin, FormMixin],
        data() {
            return {
                model: {
                    name: '',
                    email: '',
                },
                schema: {
                    groups: [
                        {
                            legend: "Mes informations",
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
                                }
                            ]
                        },
                        {
                            legend: "Gestion du mot de passe",
                            fields: [
                                {
                                    type: 'passwordChecker',
                                    inputName: 'password',
                                    label: 'Mot de passe',
                                    model: 'password',
                                    required: false,
                                    isCheckstrength: true,
                                    hint: 'Laisser vide si vous ne souhaitez pas modifier votre mot de passe'
                                },
                                {
                                    type: 'passwordChecker',
                                    inputName: 'password-confirm',
                                    label: 'Confirmation du mot de passe',
                                    model: 'password_confirmation',
                                    required: false,
                                    isCheckstrength: false,
                                    hint: 'Laisser vide si vous ne souhaitez pas modifier votre mot de passe'
                                }
                            ]
                        }
                    ],
                },
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/getUser'
            }),
        },
        created() {
            this.model = {...this.user}
            this.eventBus.$on("httpError", this.handleError)
            this.eventBus.$on("httpSuccess", this.handleSuccess)
            this.setBreadcrumb(this.$route.meta.breadcrumb)
        },
        methods: {
            ...mapActions([
                'auth/updateUser',
            ]),
            cancelUpdate() {
                this.$router.push({name: 'user_profile'})
            },
            updateProfile (e) {
                this.$refs.updateProfileForm.validate().then( resp => {
                    if (resp.length == 0) {
                        this['auth/updateUser'](this.model)
                    }
                })
            },
            handleError(err) {
                this.serverSideFormErrors(err, this.$refs.updateProfileForm)
            },
            handleSuccess(msg) {
                this.errors = {}
                this.$router.push({name: 'user_profile'})
            },
        }
    }
</script>
