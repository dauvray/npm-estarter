/*
THIS FILE MUST BE THE LAST FILE REGSITERED
 */

import Views from 'vuejs-estarter/components/views'

export default [
    {
        path: 'CONFIG_ME_IN_ESTARTER',
        name: 'home',
        component: Views.Home,
        meta: {
            breadcrumb: [
                {name: 'Accueil', link: '/'},
            ]
        }
    },
    {
        path: 'CONFIG_ME_IN_ESTARTER',
        name: 'password_request',
        component: Views.ForgottenPassword,
        meta: {
            requiresVisitor: true,
            parent: 'home',
            breadcrumb: [
                { name: 'Mot de passe oublié' }
            ]
        }
    },
    {
        path: 'CONFIG_ME_IN_ESTARTER',
        name: 'user_confirm_inscription',
        component: Views.ConfirmInscription,
        meta: {
            requiresVisitor: true,
            parent: 'home',
            breadcrumb: [
                { name: 'Confirmation d\'inscription' }
            ]
        }
    },
    {
        path: 'CONFIG_ME_IN_ESTARTER',
        name: 'password_reset',
        component: Views.ResetPassword,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: 'CONFIG_ME_IN_ESTARTER',
        name: 'login',
        component: Views.Login,
        meta: {
            requiresVisitor: true,
            parent: 'home',
            breadcrumb: [
                { name: 'Connexion' }
            ]
        }
    },
    {
        path: 'CONFIG_ME_IN_ESTARTER',
        name: 'register',
        component: Views.Register,
        meta: {
            requiresVisitor: true,
            parent: 'home',
            breadcrumb: [
                { name: 'Inscription' }
            ]
        }
    },
    {
        path: 'CONFIG_ME_IN_ESTARTER',
        name: 'user_profile',
        component: Views.Profile,
        meta: {
            requiresAuth: true,
            parent: 'home',
            breadcrumb: [
                {name: 'mon compte'},
            ]
        },
        children: [
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: 'CONFIG_ME_IN_ESTARTER',
                name: 'user_edit',
                component: Views.UpdateProfile,
                meta: {
                    requiresAuth: true,
                    parent: 'home',
                    breadcrumb: [
                        { name: 'Mon compte', link: window.estarter.routes.user_profile},
                        { name: 'Mise à jour' }
                    ]
                }
            },
            {
                // UserPosts will be rendered inside User's <router-view>
                // when /user/:id/posts is matched
                path: 'CONFIG_ME_IN_ESTARTER',
                name: 'user_delete',
                component: Views.DeleteProfile,
                meta: {
                    requiresAuth: true,
                    parent: 'home',
                    breadcrumb: [
                        { name: 'Mon compte', link: window.estarter.routes.user_profile},
                        { name: 'Suppression' }
                    ]
                }
            }
        ]
    },
    {
        path: 'CONFIG_ME_IN_ESTARTER',
        name: 'logout',
        component: Views.Logout,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '*',
        name: 'page',
        component: Views.Page,
        meta: {
            parent: 'home',
            breadcrumb: [
                { name: '' }
            ]
        }
    },
    {
        path: '/404',
        name: '404',
        component: Views.NotFoundComponent,
        meta: {
            breadcrumb: [
                { name: 'Accueil', link: '/' },
                { name: '404' }
            ]
        }
    }
]

