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

                    <div class="row">
                        <div class="col-8">
                            <div class="upload-example">
                                <div :style="{backgroundImage: 'url(' + image + ')'}" class="cropper-background"></div>
                                <cropper
                                    classname="upload-example-cropper"
                                    :src="image"
                                    ref="cropper"
                                    :stencilComponent="$options.components.CircleStencil"
                                    :stencil-props="{
                                aspectRatio: 10/10
                            }"></cropper>
                            </div>
                        </div>
                        <div class="col-4">
                            <img :src="croppedImage" style="max-width: 100%;"/>
                        </div>
                    </div>

                    <form @submit.prevent="submitForm">
                        <div class="button-wrapper">
                            <span class="button" @click="$refs.file.click()">
                                <input type="file" ref="file" @change="uploadImage($event)" accept="image/*">
                                1 - Sélectionner une image
                            </span>
                            <input type="button" class="btn btn-secondary" @click="crop" value="2 - Redimensionner" />
                            <input type="submit" class="btn btn-primary" value="3 - Valider" />
                        </div>
                    </form>

                </div>
            </div>


        </div>
    </div>
</template>

<script>

    import { mapActions, mapGetters} from 'vuex'
    import {BaseMixin} from 'vuejs-estarter/mixins/BaseMixin'
    import {FormMixin} from 'vuejs-estarter/mixins/FormMixin'
    import { Cropper, CircleStencil } from 'vue-advanced-cropper'

    export default {
        name: 'UpdateProfile',
        mixins: [BaseMixin, FormMixin],
        components: {
            ForgottenPasswordForm: () => import('vuejs-estarter/components/widgets/form/ForgottenPassword'),
            Cropper,
            CircleStencil
        },
        data() {
            return {

                image: null,
                croppedImage: null,
                coordinates: {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                },



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
                },
                file: ''
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
                'auth/updateAvatar'
            ]),
            handleError(err) {
                this.serverSideFormErrors(err, this.$refs.updateProfileForm)
            },
            handleSuccess(msg) {
                this.$router.push({name: 'user_profile'})
            },
            // General
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


            // Avatar
            submitForm(e) {
                let formData = new FormData();
                formData.append('file', this.file);
                this['auth/updateAvatar'](formData)
            },
            crop() {
                const {coordinates, canvas} = this.$refs.cropper.getResult()
                this.coordinates = coordinates
                // You able to do different manipulations at a canvas
                // but there we just get a cropped image
                this.croppedImage = canvas.toDataURL()

                fetch(this.croppedImage)
                .then(res => res.blob())
                .then(blob => {
                    this.file = new File([blob], "File name",{ type: "image/png" })
                })
            },
            uploadImage(event) {
                // Reference to the DOM input element
                var input = event.target;
                // Ensure that you have a file before attempting to read it
                if (input.files && input.files[0]) {
                    // create a new FileReader to read this image and convert to base64 format
                    var reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onload = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.image = e.target.result;
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(input.files[0]);
                }
            }
        }
    }
</script>

<style>
    .upload-example {
        position: relative;
        background: black;
    }

    .cropper-background {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: 50%;
        filter: blur(5px);
        opacity: 0.25;
    }

    .upload-example-cropper {
        border: solid 1px #EEE;
        height: 300px;
        width: 100%;
    }

    .button-wrapper {
        display: flex;
        justify-content: left;
    }

    .button {
        color: white;
        font-size: 16px;
        padding: 10px 20px;
        background: #3fb37f;
        cursor: pointer;
        transition: background 0.5s;
    }

    .button:hover {
        background: #38d890;
    }

    .button input {
        display: none;
    }
</style>
