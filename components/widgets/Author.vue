<template>
    <div class="author d-flex align-items-center">
        <gravatar-widget :user="author" :size="size" />
        <user-link
            :user="author"
        ></user-link>
    </div>
</template>

<script>
    export default {
        name: 'Author',
        components: {
            GravatarWidget: () => import('vuejs-estarter/components/widgets/Gravatar'),
            UserLink: () => import('vuejs-estarter/components/widgets/UserLink'),
        },
        data() {
            return {}
        },
        props: {
            author: {
                type: Object,
                required: true
            },
            size: {
                type: String,
                default: 'small'
            },
        }
    }
</script>
