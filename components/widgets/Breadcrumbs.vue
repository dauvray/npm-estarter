<template>
    <ul class="breadcrumb" v-if="breadCrumbs.length">
        <li v-for="(breadcrumb, idx) in breadCrumbs"
            :key="idx"
            @click="routeTo(idx)"
            :class="{'linked': !!breadcrumb.link}"
            >{{ breadcrumb.name }}</li>
    </ul>
</template>

<script>
    import { mapState } from 'pinia'
    import { useApplicationStore } from '../../stores/application.js'

    export default {
        name: 'Breadcrumbs',
        data () {
            return {}
        },
        computed: {
             ...mapState(useApplicationStore,
                {
                    breadCrumbs: 'getBreadcrumbs'
                }),
        },
        methods: {
            routeTo (pRouteTo) {
                if (this.breadCrumbs[pRouteTo].link) {
                    this.$router.push(this.breadCrumbs[pRouteTo].link).catch(err => {})
                }
            },
        }
    }
</script>

<style scoped>
    .breadcrumb {
        clear: both;
    }
    ul {
        display: flex;
        list-style-type: none;
    }
    ul > li {
        display: flex;
        float: left;
        height: 10px;
        width: auto;
        color: $default;
        font-weight: bold;
        font-size: .8em;
        cursor: default;
        align-items: center;
    }
    ul > li:not(:last-child)::after {
        content: '/';
        float: right;
        font-size: .8em;
        margin: 0 .5em;
        color: $light-default;
        cursor: default;
    }
    .linked {
        cursor: pointer;
        font-size: 1em;
        font-weight: normal;
    }
</style>
