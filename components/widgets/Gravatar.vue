<template>
    <div>
        <img v-if="item.image" :src="`${path}/${item.image}.${size}.jpg`"
             class="author-image rounded-circle"/>
        <img v-else :src="item.gravatar" class="author-image rounded-circle"/>
    </div>
</template>

<script>
export default {
    name: 'Gravatar',
    inject: ["eventBus"],
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
    },
    data() {
        return {
            item: {...this.user}
        }
    },
    created() {
        this.eventBus.$on('here-i-am', this.refreshUser)
    },
    methods: {
        refreshUser(user) {
            if(user.id === this.item.id) {
                this.item = {...user}
            }
        }
    }
}
</script>
