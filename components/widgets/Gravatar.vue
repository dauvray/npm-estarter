<template>
    <div>
        <img v-if="user.image" :src="`${user.image}.small.jpg`" class="author-image rounded-circle"/>
        <img v-else :src="user.gravatar" class="author-image rounded-circle"/>
    </div>
</template>

<script>
    export default {
        name: 'Gravatar',
        props: {
            user: {
                type: Object,
                required: true
            },
        }
    }
</script>
