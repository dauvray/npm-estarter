<template>
    <nav aria-label="Navigation" v-if="last_page > 1">
        <ul class="pagination">
            <li class="page-item" v-if="prev_page_url">
                <a class="page-link" href="#" @click.prevent="loadPrevPage" aria-label="Précédents">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Précédent</span>
                </a>
            </li>

            <li v-for="n in last_page" class="page-item" v-bind:class="{ active: current_page == n }">
                <a class="page-link" href="#" @click.prevent="loadPage(n)">{{n}}</a>
            </li>

            <li class="page-item" v-if="next_page_url">
                <a class="page-link" href="#" @click.prevent="loadNextPage" aria-label="Suivant">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Suivant</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Pagination',
    data() {
        return {}
    },
    props: {
        items: {
            type: [Array, Object],
            required: true
        },
        links: {
            type: Object,
        },
        meta: {
            type: Object,
        }
    },
    computed: {
        last_page: function() {
            if(this.meta != undefined && this.links != undefined) {
                return this.meta.last_page
            } else {
                return this.items.last_page
            }
        },
        current_page: function() {
            if(this.meta != undefined && this.links != undefined) {
                return this.meta.current_page
            } else {
                return this.items.current_page
            }
        },
        path: function () {
            if(this.meta != undefined && this.links != undefined) {
                return this.meta.path
            } else {
                return this.items.path
            }
        },
        first_page_url: function() {
            if(this.meta != undefined && this.links != undefined) {
                return this.links.first
            } else {
                return this.items.first_page_url
            }
        },
        from: function() {
            if(this.meta != undefined && this.links != undefined) {
                return this.meta.from
            } else {
                return this.items.from
            }
        },
        last_page_url: function() {
            if(this.meta != undefined && this.links != undefined) {
                return this.links.last
            } else {
                return this.items.last_page_url
            }
        },
        next_page_url: function() {
            if(this.meta != undefined && this.links != undefined) {
                return this.links.next
            } else {
                return this.items.next_page_url
            }
        },
        per_page: function() {
            if(this.meta != undefined && this.links != undefined) {
                return this.meta.per_page
            } else {
                return this.items.per_page
            }
        },
        prev_page_url: function() {
            if(this.meta != undefined && this.links != undefined) {
                return this.links.prev
            } else {
                return this.items.prev_page_url
            }
        },
        to: function() {
            if(this.meta != undefined && this.links != undefined) {
                return this.meta.to
            } else {
                return this.items.to
            }
        },
        total: function() {
            if(this.meta != undefined && this.links != undefined) {
                return this.meta.total
            } else {
                return this.items.total
            }
        }
    },
    methods: {
        loadPage(pageNumber) {
            this.$emit('loadPage', `${this.path}?page=${pageNumber}`)
        },
        loadPrevPage() {
            this.$emit('loadPage', this.prev_page_url)
        },
        loadNextPage() {
            this.$emit('loadPage', this.next_page_url)
        }
    }
}
</script>
