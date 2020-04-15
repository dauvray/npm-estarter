<template>
    <div class="estarter-header">
        <header class="navbar navbar-expand-lg navbar-dark bg-dark">
            <router-link to="/">
            <img :src="this.$estarterSettings.website_logo" />
            </router-link>
            <menu-widget v-if="showMenu" :name="menuName" />
            <connection-widget v-if="showConnectionWidget"/>
        </header>
        <alert-widget />
        <breadcrumbs-widget />
    </div>
</template>

<script>
    export default {
        name: 'Header',
        components: {
            MenuWidget: () => import('vuejs-estarter/components/widgets/menu/Menu.vue'),
            ConnectionWidget: () => import('vuejs-estarter/components/widgets/Connection.vue'),
            AlertWidget: () => import('vuejs-estarter/components/widgets/Alert.vue'),
            BreadcrumbsWidget: () => import('vuejs-estarter/components/widgets/Breadcrumbs.vue')
        },
        data() {
            return {
                menuName: 'Menu principal',
                showConnectionWidget: true,
                showMenu: true
            }
        }
    }
</script>
