<template>

    <ul class="estarter-menu navbar-nav">
        <li class="nav-item" v-for="(item, idx) in this.items" :class="{ dropdown: item.children.length }" :key="idx">

            <!-- no children -->
            <a class="nav-link" @click="goto" :data-path="item.link" v-if="!item.children.length">{{ item.name }}</a>

            <!-- has children -->
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id="themes" aria-expanded="false"
               v-if="item.children.length">{{ item.name }}</a>

            <div v-if="item.children.length" class="dropdown-menu" aria-labelledby="themes">
                <a v-for="(child, idx) in item.children"  @click="goto" :data-path="child.link" class="dropdown-item" >{{ child.name }}</a>
            </div>

        </li>
    </ul>

</template>

<script>
    export default {
        name: 'ItemList',
        data() {
            return {

            }
        },
        props: {
            items: {
                type: [Array, Object],
                required: true
            }
        },
        methods: {
            uniqueId() {
                return 'id-' + Math.random().toString(36).substr(2, 16);
            },
            goto(ev) {
                this.$router.push({ path: ev.target.dataset.path }).catch(err => {})
            }
        }
    }
</script>

<style lang="scss" scoped>
    a {
        cursor: pointer;
    }
</style>
