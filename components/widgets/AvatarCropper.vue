<template>
    <modal-widget target="changeavatar" btnclass="btn btn-link" @saveModalChanges="onSaveModalChanges">
        <template #button>
            <img :src="urlPicture" class="estarter-avatar img-fluid rounded-circle"/>
        </template>
        <template #header>
            Modifier mon avatar
        </template>
        <template #body>
            <cropper-widget ref="cropper" :currentimage="urlPicture"></cropper-widget>
        </template>
    </modal-widget>
</template>

<script>

export default {
    name: "AvatarCropper",
    components: {
        ModalWidget: () => import('vuejs-estarter/components/widgets/Modal'),
        CropperWidget: () => import('vuejs-estarter/components/widgets/CropperWidget'),
    },
    props: {
        avatarurl: {
            type: String,
            required: true
        },
        size: {
            type: String,
            default: 'medium'
        }
    },
    data() {
        return {
            urlPicture: null
        }
    },
    created() {
        this.urlPicture = this.avatarurl
    },
    methods: {
         onSaveModalChanges() {
            let formData = new FormData()
            let file = this.$refs.cropper.file
            formData.append('file', file )

             // is in vuejs-estarter framework ?
             if(typeof this.$estarterSettings === 'undefined') {
                 axios.post('/update-avatar', formData)
                     .then((response) => {
                         this.urlPicture = `${response.data.image}.${this.size}.jpg` || response.data.gravatar
                     })
                     .catch((error) => {
                         console.log(error);
                     });
             } else {
                 this.$emit('onCroppedPicture', file)
             }

             // TODO: vanilliaJs
             $('#changeavatar').modal('hide')
        },
    }
}
</script>

