/*
THIS FILE MUST BE THE LAST FILE REGSITERED
 */

//import Views from '../components/views'
import Vue from 'vue'

export default [
    {
        path: 'CONFIG_ME_IN_ESTARTER',
        name: 'home',
        component: window.estarterViews.Home,
        meta: {
            breadcrumb: [
                {name: 'Accueil', link: '/'},
            ]
        }
    },
    {
        path: 'CONFIG_ME_IN_ESTARTER',
        name: 'password_request',
        component: window.estarterViews.ForgottenPassword,
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
        component: window.estarterViews.ConfirmInscription,
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
        component: window.estarterViews.ResetPassword,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: 'CONFIG_ME_IN_ESTARTER',
        name: 'login',
        component: window.estarterViews.Login,
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
        component: window.estarterViews.Register,
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
        component: window.estarterViews.Profile,
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
                component: window.estarterViews.UpdateProfile,
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
                component: window.estarterViews.DeleteProfile,
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
        component: window.estarterViews.Logout,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '*',
        name: 'page',
        component: window.estarterViews.Page,
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
        component: window.estarterViews.NotFoundComponent,
        meta: {
            breadcrumb: [
                { name: 'Accueil', link: '/' },
                { name: '404' }
            ]
        }
    }
]

