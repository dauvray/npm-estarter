<template>
    <div class="user-link d-flex flex-column ms-2">
        <template v-if="profileurl">
            <a class="user-name" :href="profileurl">{{ user.name }}</a>
            <span class="user-function text-muted">{{ user.function}}</span>
        </template>
        <template v-else>
            <span class="user-name">{{ user.name}}</span>
            <span class="user-function text-muted">{{ user.function}}</span>
        </template>
    </div>
</template>

<script>

export default {
    name: 'UserLink',
    props: {
        user: {
            type: Object,
            required: true
        },
    },
    computed: {
        profileurl: function() {
            return this.user.hasOwnProperty('profile') ? this.user.profile : false
        }
    },
    methods: {
        convertToSlug(text) {
            return text
                .toLowerCase()
                .replace(/ /g,'-')
                .replace(/[^\w-]+/g,'')
                ;
        },
    }
}
</script>
