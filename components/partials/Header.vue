<template>
    <div class="estarter-header">
        <header class="navbar navbar-expand-lg navbar-dark bg-dark">
            <router-link to="/">
            <img :src="this.$estarterSettings.website_logo" />
            </router-link>
            <menu-widget name="Menu principal" />
            <connection-widget />
        </header>
        <alert-widget />
        <breadcrumbs-widget />
    </div>
</template>

<script>
    export default {
        name: 'Header',
        components: {
            MenuWidget: () => import('laravel-estarter/components/widgets/menu/Menu.vue'),
            ConnectionWidget: () => import('laravel-estarter/components/widgets/Connection.vue'),
            AlertWidget: () => import('laravel-estarter/components/widgets/Alert.vue'),
            BreadcrumbsWidget: () => import('laravel-estarter/components/widgets/Breadcrumbs.vue')
        }
    }
</script>
