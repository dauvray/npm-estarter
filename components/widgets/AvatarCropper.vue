<template>
    <modal-widget
        target="changeavatar"
        btnclass="btn btn-link"
        :canValidate="canValidateAvatar"
        @saveModalChanges="onSaveModalChanges">
        <template #button>
            <gravatar-widget
                class="float-left pr-2"
                :user="itemComputed"
                :path="path"
            ></gravatar-widget>
        </template>
        <template #header>
            Modifier mon avatar
        </template>
        <template #body>
            <cropper-widget
                ref="cropper"
                :currentimage="urlPicture"
                @onCroppedPicture="onCroppedCover"
                @canValidate="canValidateAvatar = true"
            ></cropper-widget>
        </template>
    </modal-widget>
</template>

<script>

export default {
    name: "AvatarCropper",
    inject: ["eventBus"],
    components: {
        ModalWidget: () => import('vuejs-estarter/components/widgets/Modal'),
        CropperWidget: () => import('vuejs-estarter/components/widgets/CropperWidget'),
        GravatarWidget: () => import('vuejs-estarter/components/widgets/Gravatar'),
    },
    props: {
        item: {
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
            file: null,
            element: this.item,
            canValidateAvatar: false
        }
    },
    computed: {
        urlPicture: function () {
            if(this.item.image) {
                return `${this.path}/${this.itemComputed.image}.${this.size}.jpg`
            } else {
                return this.itemComputed.gravatar
            }
        },
        itemComputed: function() {
            return this.element
        }
    },
    watch: {
        item: function (newValue, oldValue) {
            this.element = newValue
        }
    },
    methods: {
        onCroppedCover(file) {
            this.file = file
        },
         onSaveModalChanges() {
            let formData = new FormData()
            formData.append('file', this.file )

             // is in vuejs-estarter framework ?
             if(typeof this.$estarterSettings === 'undefined') {
                 axios.post('/update-avatar', formData)
                     .then((response) => {
                         this.element = response.data
                         // to server widget
                         this.eventBus.$emit('refresh-global-user')
                     })
                     .catch((error) => {
                         console.log(error);
                     });
             } else {
                 this.$emit('onCroppedAvatar', this.file)
             }
             $('#changeavatar').modal('hide')
        },
    }
}
</script>

