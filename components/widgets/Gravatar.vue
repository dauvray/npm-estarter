<template>
    <div class="position-relative">
        <img v-if="item.image"
             :src="imageLink"
             class="author-image rounded-circle"/>
        <img v-else :src="item.gravatar"
             class="author-image rounded-circle"/>
        <gravatar-status
            v-if="status"
            :user="user"
            :size="size"
        ></gravatar-status>
    </div>
</template>

<script>
export default {
    name: 'Gravatar',
    inject: ["eventBus"],
    components: {
        GravatarStatus: () => import('vuejs-estarter/components/widgets/GravatarStatus')
    },
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
        },
        status: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    data() {
        return {
            item: {...this.user}
        }
    },
    computed: {
        imageLink: function() {
            // new version
            if(typeof this.item.image === 'object' &&
            !Array.isArray(this.item.image) &&
            this.item.image !== null) {
                return this.item.image[this.size]
            }
            // old version
            return `${this.path}/${this.item.image}.${this.size}.jpg`
        }
    },
    created() {
        this.eventBus.$on('here-i-am', this.refreshUser)
    },
    watch: {
        user: function (newValue, oldValue) {
            this.item = {...newValue}
        },
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

<style>
    .author-image {
        border: 2px solid #444;
    }

</style>
