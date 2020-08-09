<template>
    <div>
        <input type="button" @click="cancelDelete" class="btn btn-warning" value="Annuler" />
        <input type="button" @click="deleteProfile" class="btn btn-danger" value="Supprimer mon compte définitivement" />
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import {BaseMixin} from 'vuejs-estarter/mixins/BaseMixin'

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
            },
            cancelDelete() {
                this.$router.push({name: 'user_profile'})
            },
        }
    }
</script>
