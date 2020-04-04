<template>
    <div>
        <div class="row" v-if="image">
            <div class="col-8">
                <div class="upload-example">
                    <div :style="{backgroundImage: 'url(' + image + ')'}" class="cropper-background"></div>
                    <cropper
                        classname="upload-example-cropper"
                        :src="image"
                        ref="cropper"
                        :stencilComponent="$options.components.CircleStencil"
                        :stencil-props="{aspectRatio: 10/10}"></cropper>
                </div>
            </div>
            <div class="col-4">
                <img :src="croppedImage" style="max-width: 100%;"/>
            </div>
        </div>

        <div class="button-wrapper">
            <span class="button" @click="$refs.file.click()">
                <input type="file" ref="file" @change="uploadImage($event)" accept="image/*">
                1 - Sélectionner une image
            </span>
            <input type="button" class="btn btn-secondary" v-if="image" @click="crop" value="2 - Redimensionner" />
            <input type="submit" class="btn btn-primary" v-if="image && file" @click="returnPicture" value="3 - Valider" />
        </div>

    </div>
</template>

<script>
    import { Cropper, CircleStencil } from 'vue-advanced-cropper'

    export default {
        name: 'CropperWidget',
        components: {
            Cropper,
            CircleStencil
        },
        data() {
            return {
                image: null,
                file: '',
                croppedImage: null,
                coordinates: {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                },
            }
        },
        methods: {
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
            },
            returnPicture() {
                this.$emit('onCroppedPicture', this.file)
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
