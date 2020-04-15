<template>
    <footer class="estarter-footer navbar navbar-expand-lg navbar-dark bg-dark mt-3">
        <menu-widget v-if="showMenu" :name="menuName"/>
    </footer>
</template>

<script>
     export default {
         name: 'Footer',
         components: {
             MenuWidget: () => import('vuejs-estarter/components/widgets/menu/Menu.vue'),
         },
         data() {
             return {
                 menuName: 'Menu footer',
                 showMenu: true
             }
         }
     }
</script>
