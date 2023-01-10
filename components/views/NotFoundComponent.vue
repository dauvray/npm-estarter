<template>
    <div>
        <h1>Page introuvable</h1>
    </div>
</template>

<script>
    import {BaseMixin} from 'vuejs-estarter/mixins/BaseMixin'
    export default {
        'name': 'NotFoundComponent',
        mixins: [BaseMixin],
        created() {
           this.setBreadcrumb([...this.$route.meta.breadcrumb])
        },
    }
</script>
