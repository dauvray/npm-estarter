<template>
    <div class="author d-flex align-items-center">
        <gravatar-widget :user="author" :size="size" />
        <user-link
            :user="author"
        ></user-link>
    </div>
</template>

<script>
    import GravatarWidget from 'vuejs-estarter/components/widgets/Gravatar.vue'
    import UserLink from 'vuejs-estarter/components/widgets/UserLink.vue'
    
    export default {
        name: 'Author',
        components: {
            GravatarWidget,
            UserLink,
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
