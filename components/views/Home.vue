<template>
    <div>
        <img src="../../assets/logo.png" />
        <h1>Vue.js-Estarter</h1>
    </div>
</template>

<script>

    import {BaseMixin} from 'laravel-estarter/mixins/BaseMixin'

    export default {
        name: 'Home',
        mixins: [BaseMixin],
        components: {
        },
        data() {
            return {
            }
        },
        created() {
            this.setBreadcrumb([])
        },
        computed: {

        },
        methods: {

        }
    }
</script>


