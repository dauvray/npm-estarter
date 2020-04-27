<template>
    <item-list :items="this.items" />
</template>

<script>

    import {AuthorizationMixin} from 'vuejs-estarter/mixins/AuthorizationMixin'

    export default {
        name: 'Menu',
        mixins: [AuthorizationMixin],
        inject: ['estarterViews'],
        components: {
            ItemList: () => import('vuejs-estarter/components/widgets/menu/ItemList.vue'),
        },
        data() {
            return {
                items: [],
                views: []
            }
        },
        props: {
            name: {
                type: String,
                required: true
            }
        },
        methods: {
            processData(resp) {

                // save items
                this.items = resp.data

                resp.data.forEach((el) => {
                    this.createAndAppendRoute(el)
                })
            },
            createAndAppendRoute(item) {
                // create routes
                let newRoute = {
                    path: item.link,
                    component: this.estarterViews[item.extras.component],
                    name: `item_${item.id}`,
                    props: {
                        entity_type: item.type,
                        entity_id: item.type_id,
                    },
                    meta: {
                        parent: 'home',
                        breadcrumb: [
                            { name: item.name }
                        ]
                    }
                }

                this.$router.addRoutes([newRoute])
            },
            getItems() {
                this.axios({
                    method: 'get',
                    url: `/menu/${this.name}`,
                }).then(response => {
                    this.processData(response)
                }).catch(error => {
                    console.log(error)
                });
            },
            onLogin() {
                this.getItems()
            },
            onLogout() {
                this.getItems()
            }
        },
        created() {
            this.getItems()
        },
    }
</script>
