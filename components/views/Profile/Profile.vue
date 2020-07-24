<template>
    <div v-if="user">
        <div class="d-flex align-items-center">
            <gravatar-widget :user="user" class="float-left pr-2" />
            <h1>
                {{user.name }}
            </h1>
        </div>
        <router-link :to="$estarterRoutes.user_edit">Modifier</router-link>
        <router-link :to="$estarterRoutes.user_delete">Supprimer</router-link>
        <div class="row">
            <div class="col-3">

            </div>
            <div class="col-9">
                <transition :name="transitionName" mode="out-in" >
                    <router-view></router-view>
                </transition>
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
        },
        data() {
            return {
                transitionName: ''
            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                if(toDepth == fromDepth) {
                    this.transitionName = 'fade'
                } else {
                    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
                }
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
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .slide-right-enter-active,
    .slide-right-leave-active {
        transition: opacity 1s, transform 1s;
    }

    .slide-right-enter,
    .slide-right-leave-active {
        opacity: 0;
        transform: translateX(-30%);
    }

    .slide-left-enter-active,
    .slide-left-leave-active {
        transition: opacity 1s, transform 1s;
    }

    .slide-left-enter,
    .slide-left-leave-active {
        opacity: 0;
        transform: translateX(30%);
    }

    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>
