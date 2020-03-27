<template>
    <div>

        <h1>Espace perso</h1>

        <div class="row">
            <div class="col-3">
                <profile-user :user="user" ></profile-user>
            </div>
            <div class="col-9">
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>

<script>

    import {mapGetters} from 'vuex'
    import {BaseMixin} from 'vuejs-estarter/mixins/BaseMixin'

    export default {
        name: 'Profile',
        mixins: [BaseMixin],
        components: {
            GravatarWidget: () => import('vuejs-estarter/components/widgets/Gravatar'),
            ProfileUser: () => import('vuejs-estarter/components/widgets/ProfileUser'),
        },
        data() {
            return {

            }
        },
        created() {
            this.setBreadcrumb(this.$route.meta.breadcrumb)
        },
        computed: {
            ...mapGetters({
                user: 'auth/getUser'
            }),
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
