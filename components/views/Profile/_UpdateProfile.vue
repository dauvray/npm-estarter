<template>
    <div class="card">
        <div class="card-header">
            <h3>Mon compte</h3>
        </div>
        <div class="card-body">

            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="general-tab" data-toggle="tab" href="#general" role="tab" aria-controls="general" aria-selected="true">Général</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="password-tab" data-toggle="tab" href="#password" role="tab" aria-controls="password" aria-selected="false">Mot de passe</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="avatar-tab" data-toggle="tab" href="#avatar" role="tab" aria-controls="avatar" aria-selected="false">Avatar</a>
                </li>
            </ul>

            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
                    <form @submit.prevent="updateProfile">
                        <vue-form-generator ref="updateProfileForm" :schema="schema"
                                            :model="model" :options="formOptions"
                                            @validated="updateValidationFormClasses()"></vue-form-generator>
                        <input type="button" class="btn btn-warning" value="Annuler" @click="cancelUpdate" />
                        <input type="submit" class="btn btn-success" value="Envoyer" />
                    </form>
                </div>
                <div class="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
                    <forgotten-password-form></forgotten-password-form>
                </div>
                <div class="tab-pane fade" id="avatar" role="tabpanel" aria-labelledby="avatar-tab">
                    <avatar-cropper :avatarurl="user.image || user.gravatar" size="medium"
                                    @onCroppedAvatar="submitCroppedAvatar"
                    ></avatar-cropper>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    import {mapActions, mapGetters} from 'vuex'
    import {BaseMixin} from 'vuejs-estarter/mixins/BaseMixin'
    import {FormMixin} from 'vuejs-estarter/mixins/FormMixin'

    export default {
        name: 'UpdateProfile',
        mixins: [BaseMixin, FormMixin],
        components: {
            ForgottenPasswordForm: () => import('vuejs-estarter/components/widgets/form/ForgottenPassword'),
            AvatarCropper: () => import('vuejs-estarter/components/widgets/AvatarCropper'),
        },
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
                        }
                    ],
                }
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
            handleError(err) {
                this.serverSideFormErrors(err, this.$refs.updateProfileForm)
            },
            handleSuccess(msg) {
                this.$router.push({name: 'user_profile'}).catch(err => {})
            },
            // General
            cancelUpdate() {
                this.$router.push({name: 'user_profile'}).catch(err => {})
            },
            updateProfile (e) {
                this.$refs.updateProfileForm.validate().then( resp => {
                    if (resp.length == 0) {
                        this['auth/updateUser'](this.model)
                    }
                })
            },
        }
    }
</script>
