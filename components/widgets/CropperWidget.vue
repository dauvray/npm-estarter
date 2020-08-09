<template>
    <div>
        <div class="row" >
            <div class="col-4">
                <img :src="croppedImage" class="img-fluid" />
            </div>
            <div class="col-8">
                <div class="button-wrapper">
                    <span class="button" @click="$refs.file.click()">
                        <input type="file" ref="file" @change="uploadImage($event)" accept="image/*">
                        <i class="fas fa-file-upload"></i> Sélectionner une image
                    </span>
                </div>
                <div v-if="image" class="upload-example">
                    <div :style="{backgroundImage: `url(${image})`}" class="cropper-background"></div>
                    <cropper
                        classname="upload-example-cropper"
                        :src="image"
                        ref="cropper"
                        :stencilComponent="currentStencil"
                        :stencil-props="currentRationStencil"
                        @change="crop"
                    ></cropper>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Cropper, RectangleStencil, CircleStencil } from 'vue-advanced-cropper'

    export default {
        name: 'CropperWidget',
        components: {
            Cropper,
            CircleStencil,
            RectangleStencil
        },
        props: {
           currentimage: {
               type: String,
               default: null
           },
            stencil: {
               type: String,
                default: 'avatar'
            }
        },
        data() {
            return {
                image: null,
                file: '',
                croppedImageUpdated: null,
                coordinates: {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                },
            }
        },
        computed: {
            currentStencil: function() {
                switch (this.stencil) {
                    case 'avatar':
                        return CircleStencil
                        break
                    case 'cover':
                        return RectangleStencil
                        break
                    default:
                        return RectangleStencil
                }
            },
            currentRationStencil: function() {
                switch (this.stencil) {
                    case 'avatar':
                        return {aspectRatio: 10/10}
                        break
                    case 'cover':
                        return {aspectRatio: 10/2}
                        break
                    default:
                        return {aspectRatio: 10/10}
                }
            },
            croppedImage: function() {
                return this.croppedImageUpdated || this.currentimage
            }
        },
        watch: {
            file: function (newValue, oldValue) {
                // the first time only
                if(newValue && !oldValue) {
                    this.$parent.$emit('canValidate', true)
                }
            }
        },
        methods: {
            crop() {
                const {coordinates, canvas} = this.$refs.cropper.getResult()
                this.coordinates = coordinates
                // You able to do different manipulations at a canvas
                // but there we just get a cropped image
                this.croppedImageUpdated = canvas.toDataURL()

                fetch(this.croppedImage)
                    .then(res => res.blob())
                    .then(blob => {
                        this.file = new File([blob], "File name",{ type: "image/png" })
                        this.$emit('onCroppedPicture', this.file)
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
            },
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
