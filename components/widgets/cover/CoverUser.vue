<template>
    <div class="d-flex align-items-end" :style="{backgroundImage: BackgroundImage, backgroundSize: backgroundSize}">
        <avatar-cropper :size="size" :user="item"
                        @onCroppedAvatar="onCroppedAvatar"
        ></avatar-cropper>
        <div class="mr-2 pb-1 bg-opacity-dark-3">
            <h2 class="text-white p-2">{{ item.name }}</h2>
            <i class="text-white p-2">{{ item.email }}</i>
        </div>
        <a class="mr-2 btn btn-primary" role="button" @click.prevent="editProfil" href="#">
            <i class="fas fa-pencil-alt"></i>
        </a>
        <div class="flex-grow-1">
            <modal-widget v-if="item" target="changecover" @saveModalChanges="onSaveModalChanges">
                <template #button>
                        <i class="fas fa-camera"></i>
                </template>
                <template #header>
                    Modifier couverture
                </template>
                <template #body>
                    <cropper-widget ref="cropper" :currentimage="coverUrl"
                                    @onCroppedPicture="onCroppedCover"
                    ></cropper-widget>
                </template>
            </modal-widget>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CoverUser',
        components: {
            AvatarCropper: () => import('vuejs-estarter/components/widgets/AvatarCropper'),
            ModalWidget: () => import('vuejs-estarter/components/widgets/Modal'),
            CropperWidget: () => import('vuejs-estarter/components/widgets/CropperWidget'),
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
            editroute: {
                type: String,
                required: true
            },
        },
        data() {
          return {
              file: null,
              item: this.user,
              backgroundSize: 'cover'
          }
        },
        computed: {
            BackgroundImage: function () {
                return `url(${this.coverUrl})`
            },
            coverUrl: function() {
                return `/storage/covers/${this.item.cover}`
            }
        },
        methods: {
            onCroppedCover(file) {
                this.file = file
            },
            editProfil() {
                window.location = this.editroute
            },
            onSaveModalChanges() {
                let formData = new FormData()
                formData.append('file', this.file )

                // is in vuejs-estarter framework ?
                if(typeof this.$estarterSettings === 'undefined') {
                    axios.post('/update-cover', formData)
                        .then((response) => {
                            this.item = response.data
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    this.$emit('onCroppedCover', this.file)
                }

                // TODO: vanilliaJs
                $('#changecover').modal('hide')
            },
            onCroppedAvatar(file) {
                this.$emit('onCroppedAvatar', file)
            }
        }
    }
</script>

