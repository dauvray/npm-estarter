<template>
    <button type="button" @click="deleteProfile" class="btn btn-danger">Supprimer mon compte définitivement</button>
</template>

<script>
    import { mapActions } from 'vuex'
    import {BaseMixin} from 'laravel-estarter/mixins/BaseMixin'

    export default {
        name: 'DeleteProfile',
        mixins: [BaseMixin],
        data() {
            return {}
        },
        created() {
            this.setBreadcrumb(this.$route.meta.breadcrumb)
        },
        computed: {

        },
        methods: {
            ...mapActions([
                'auth/deleteUser',
            ]),

            deleteProfile() {
                if (confirm('Are you sure you want to delete you account?')) {
                    this['auth/deleteUser']().then(response => {
                        if (response.status === "ok") {
                            this.eventBus.$emit("httpSuccess", 'Your account has been deleted')
                            this.$router.push({name: 'home'})
                        }
                    })
                }
            }
        }
    }
</script>
