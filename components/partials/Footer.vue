<template>
    <footer class="estarter-footer navbar navbar-expand-lg navbar-dark bg-dark mt-3">
        <menu-widget name="Menu footer"/>
    </footer>
</template>

<script>
     export default {
         name: 'Footer',
         components: {
             MenuWidget: () => import('vuejs-estarter/components/widgets/menu/Menu.vue'),
         },
         data() {
             return {}
         },
     }
</script>
