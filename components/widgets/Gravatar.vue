<template>
    <div class="position-relative">
        <img v-if="image"
             :src="imageLink"
             class="author-image rounded-circle"/>
        <img v-else :src="gravatar"
             class="author-image rounded-circle"/>
        <gravatar-status
            :size="size"
            ></gravatar-status>
    </div>
</template>

<script>

import GravatarStatus from 'vuejs-estarter/components/widgets/GravatarStatus.vue'
import { mapState, mapWritableState } from 'pinia'
import { useMeStore } from '../../stores/me.js'

export default {
    name: 'Gravatar',
    inject: ["eventBus"],
    components: {
        GravatarStatus
    },
    props: {
        size: {
            type: String,
            default: 'medium'
        },
        path: {
            type: String,
            default: '/storage/users'
        },
    },
    data() {
        return {}
    },
    computed: {
        ...mapWritableState(useMeStore,
            [
                'image'
            ]),
        ...mapState(useMeStore,
            [
                'gravatar'
            ]),
        imageLink: function() {
            // new version
            if(typeof this.image === 'object' &&
            !Array.isArray(this.image) &&
            this.image !== null) {
                return this.image[this.size]
            }
            // old version
            return `${this.path}/${this.image}.${this.size}.jpg`
        }
    },
}
</script>

<style>
    .author-image {
        border: 2px solid #444;
    }

</style>
