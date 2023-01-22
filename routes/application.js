//////////////////////////////////////////////////
// Routes must have the same name as the view file.
////////////////////////////////////////////////////

export default [
    {
        path: `/${router_base_url}`,
        name: 'Home',
        component: () => import('vuejs-estarter/components/views/Home.vue'),
        meta: {
            breadcrumb: [
                {name: 'Accueil', link: null},
            ]
        }
    },

    // keep on last position
    {
        path: `/${router_base_url}/:pathMatch(.*)*`,
        name: 'NotFound',
        component: () => import('vuejs-estarter/components/views/NotFound.vue'),
        meta: {
            breadcrumb: [
                { name: 'Accueil', link: '/' },
                { name: '404', link: null }
            ]
        }
    }
]
