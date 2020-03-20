export default {
    metaInfo() {
        const project = this.meta || { title: 'Loading...'}
        return project
    },
    data() {
        return {
            meta: null
        }
    },
    methods: {
        initMeta(seo) {
            this.meta = {
                title: seo.title_seo,
                meta: [
                    {
                        name: 'description',
                        content: seo.description_seo,
                    },
                    {
                        property: 'og:title',
                        content: seo.title_seo,
                        template: '%s | My page',
                    },
                    {
                        property: 'og:description',
                        content: seo.description_opengraph,
                    },
                    {
                        property: 'og:type',
                        content: seo.type_opengraph,
                    },
                    {
                        property: 'og:locale',
                        content: seo.locale,
                    },
                    {
                        property: 'og:site_name',
                        content: seo.app_name,
                    },
                    {
                        name: 'twitter:title',
                        content: seo.title_twitter,
                        template: '%s | My page',
                    },
                    {
                        name: 'twitter:description',
                        content: seo.description_twitter,
                    },
                    {
                        name: 'twitter:card',
                        content: seo.card_twitter,
                    },                        {
                        name: 'twitter:url',
                        content: seo.url_twitter,
                    },
                ]
            }
        }
    }
}
