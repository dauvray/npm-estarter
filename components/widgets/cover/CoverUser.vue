<template>
    <div class="d-flex align-items-end p-3"
         :style="{backgroundImage: BackgroundImage, backgroundSize: backgroundSize}">
        <avatar-cropper :size="size" :item="item"
                        @onCroppedAvatar="onCroppedAvatar"
        ></avatar-cropper>
        <div class="mr-2 pb-1 bg-opacity-dark-3">
            <h2 class="text-white m-0 p-2">{{ item.name }}</h2>
            <i class="text-white p-2">{{ item.email }}</i>
        </div>
        <a class="mr-2 btn btn-primary" role="button"
           @click.prevent="editProfil" href="#">
            <i class="fas fa-pencil-alt"></i>
        </a>
        <div class="flex-grow-1">
            <modal-widget target="changecover" class="d-flex justify-content-end"
                          @saveModalChanges="onSaveModalChanges">
                <template #button>
                        <i class="fas fa-camera"></i>
                </template>
                <template #header>
                    Modifier couverture
                </template>
                <template #body>
                    <cropper-widget ref="cropper" :currentimage="coverUrl" stencil="cover"
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
              backgroundSize: 'cover',
              element: this.user
          }
        },
        computed: {
            BackgroundImage: function() {
                return `url(${this.coverUrl})`
            },
            coverUrl: function() {
                return this.item.cover
                    ? `/storage/covers/${this.item.cover}`
                    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
            },
            item: function() {
                return this.element
            }
        },
        watch: {
            user: function (newValue, oldValue) {
                this.element = newValue
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
                            this.element = response.data
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    this.$emit('onCroppedCover', this.file)
                }

                $('#changecover').modal('hide')
            },
            onCroppedAvatar(file) {
                this.$emit('onCroppedAvatar', file)
            }
        }
    }
</script>

