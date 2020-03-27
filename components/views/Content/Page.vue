<template>
    <div class="container" >
        <h1>{{ page.name }}</h1>
        <div v-html=" page.content"></div>
    </div>
</template>

<script>

    import {BaseMixin} from 'vuejs-estarter/mixins/BaseMixin'

    export default {
        name: 'Page',
        mixins: [BaseMixin],
        data() {
            return {
                page: {}
            }
        },
        props: {
            entity_id : null,
        },
        methods: {
            processData(resp) {
                this.page = resp.data
                this.$route.meta.breadcrumb[0] = { 'name': this.page.name}
                this.setBreadcrumb(this.$route.meta.breadcrumb)
            }
        },
        created() {
            // if come from internal router
            if(this.entity_id != null) {
                this.requestApi(`/page/${this.entity_id}`)
                .then(response => {
                    this.processData(response)
                })

            // if come from external URL
            } else {
                let slug = this.$route.path.replace("/", "")
                this.requestApi(`/${slug}`)
                .then( response => {
                    this.processData(response)}
                )
            }
        }
    }
</script>
