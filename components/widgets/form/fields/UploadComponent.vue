<template>
    <div>
        <button
            type="button"
            :class="btnClass"
            @click="onUploadFile"
        ><i v-if="btnIcon" :class="btnIcon" title="joindre un fichier"></i> {{btnLabel}}
        </button>
        <form :id="`temp-form-${uid}`"></form>
    </div>
</template>

<script>
    export default {
        name: "UploadComponent",
        props: {
            btnLabel: {
                type: String,
                required: false,
                default: 'Envoyer'
            },
            btnClass: {
              type: String,
              required: false,
              default: 'btn btn-secondary'
            },
            accept: {
                type: String,
                required: false,
                default: ''
            },
            btnIcon: {
                type: String,
                required: false,
                default: 'las la-file-upload'
            }
        },
        data() {
            return {
                uid: `${Math.floor(Math.random() * Date.now())}`,
            }
        },
        methods: {
            onUploadFile() {
                let input = document.querySelector('input.temp')
                input = input ? input : document.createElement('input')
                input.className = 'temp'
                input.type = 'file'
                input.accept = this.accept
                input.setAttribute('aria-hidden', true)
                // Safari/iOS requires appending the file input to the DOM
                document.querySelector(`#temp-form-${this.uid}`).appendChild(input)
                input.addEventListener('change', this.handleFileInput)
                input.click()
            },
            handleFileInput() {
                event.preventDefault()
                this.$emit('selected-file', event.target.files[0])
            },
        }
    }
</script>

<style scoped>

</style>
