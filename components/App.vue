<template>

    <div id="app">
        <div class="top-content">
            <header-app />
            <main class="container-fluid">
                <!--
                Even when routes use the same component, treat them
                as distinct and create the component again.
                -->
                <transition  name="fade" mode="out-in" >
                    <router-view :key="$route.fullPath" />
                </transition>
            </main>
        </div>
        <footer-app />
    </div>

</template>

<script>
    import { mapActions} from 'vuex'
    import breadcrumbs from 'laravel-estarter/mixins/BreadcrumbsMixin'

    export default {
        name: 'App',
        components: {
            HeaderApp : () => import('laravel-estarter/components/partials/Header'),
            FooterApp : () => import('laravel-estarter/components/partials/Footer')
        },
        inject: ["eventBus"],
        mixins: [breadcrumbs],
        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: 'Default Title',
            // all titles will be injected into this template
            titleTemplate: '%s | My Awesome Webapp'
        },
        data() {
            return {
            }
        },
        watch: {
            '$route' () {
                // on refresh the main component is Home
                // todo
               // this.setBreadcrumb(this.$route.meta.breadcrumb)
            }
        },
        methods: {
            ...mapActions([
                'auth/checkUser',
                'auth/retrieveUser',
            ]),
        },
        created() {

            // after page refresh check if user is loggedin.
            try {
                this['auth/checkUser']()
                    .then(response => {
                    if(response){
                        this['auth/retrieveUser']()
//                        .then(response => {
//                            this.$router.push({'name' : 'user_profile'});
//                        });
                    }
                })
            }
            catch(error) {
                console.error(error);
                // expected output: ReferenceError: nonExistentFunction is not defined
                // Note - error messages will vary depending on browser
            }
        },
    }

</script>

<style lang="scss" >

    #app {

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
    }

    html, body {
        height: 100%;
    }
    #app {
        display: flex;
        flex-direction: column;
    }
    .top-content {
        flex: 1 0 auto;
    }
    footer {
        flex-shrink: 0;
    }

</style>
