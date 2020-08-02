<template>
    <modal-widget v-if="item" target="changeavatar" btnclass="btn btn-link" @saveModalChanges="onSaveModalChanges">
        <template #button>
            <gravatar-widget :user="item" :path="path" class="float-left pr-2" />
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
        GravatarWidget: () => import('vuejs-estarter/components/widgets/Gravatar'),
    },
    props: {
        user: {
            type: Object,
            required: true
        },
        size: {
            type: String,
            default: 'medium'
        },
        path: {
            type: String,
            default: '/storage/users'
        }
    },
    data() {
        return {
            item: this.user
        }
    },
    computed: {
        urlPicture: function () {
            if(this.item.image) {
                return `${this.path}/${this.item.image}.${this.size}.jpg`
            } else {
                return `${this.path}/${this.item.gravatar}`
            }
        }
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
                         this.item = response.data
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

