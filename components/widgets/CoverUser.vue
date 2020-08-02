<template>
    <div class="d-flex align-items-end">
        <avatar-cropper :size="size" :user="user"></avatar-cropper>
        <div class="p-2 ">
            <h2 class="text-white bg-opacity-dark-3 p-2">{{ user.name }}</h2>
            <i class="text-white bg-opacity-dark-3 p-2">{{ user.email }}</i>
        </div>
        <div class="p-2 flex-grow-1">
            <a class="btn btn-primary" role="button" @click.prevent="editProfil" href="#">
                <i class="fas fa-pencil-alt"></i>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "CoverUser",
    components: {
        AvatarCropper: () => import('vuejs-estarter/components/widgets/AvatarCropper'),
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
    methods: {
        editProfil() {
            window.location = this.editroute
        }
    }
}
</script>

