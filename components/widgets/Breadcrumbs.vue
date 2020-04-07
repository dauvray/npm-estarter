<template>
    <div class="breadcrumb" v-if="breadCrumbs.length">
        <ul>
            <li v-for="(breadcrumb, idx) in breadCrumbs" :key="idx" @click="routeTo(idx)"
                :class="{'linked': !!breadcrumb.link}">
                {{ breadcrumb.name }}
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Breadcrumb',
        data () {
            return {}
        },
        computed: {
            ...mapGetters({
                breadCrumbs: 'breadcrumbs/getBreadcrumbs'
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
        justify-content: center;
        list-style-type: none;
        margin: 0;
        padding: 0;
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
