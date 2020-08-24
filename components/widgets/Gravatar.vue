<template>
    <div>
        <img v-if="user.image" :src="`${path}/${user.image}.${size}.jpg`"
             class="author-image rounded-circle"/>
        <img v-else :src="user.gravatar" class="author-image rounded-circle"/>
    </div>
</template>

<script>
export default {
    name: 'Gravatar',
    props: {
        size: {
            type: String,
            default: 'medium'
        },
        user: {
            type: Object,
            required: true
        },
        path: {
            type: String,
            default: '/storage/users'
        }
    }
}
</script>
