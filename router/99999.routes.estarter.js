/*
THIS FILE MUST BE THE LAST FILE REGSITERED
 */

import Views from 'vuejs-estarter/components/views'

/**
 * /CONFIG_ME_IN_ESTARTER : in config/estarter.php ( laravel )
 * There is a route config to translate the url
 * the 'name' here is equal to the routes.front indexes
 *
 * customViews : you can overwrite the estarter components in your app
 */

export default function(customViews) {

    return [
        {
            path: '/CONFIG_ME_IN_ESTARTER',
            name: 'home',
            component: customViews.Home || Views.Home,
            meta: {
                breadcrumb: [
                    {name: 'Accueil', link: '/'},
                ]
            }
        },
        {
            path: '/CONFIG_ME_IN_ESTARTER',
            name: 'password_request',
            component: customViews.ForgottenPassword || Views.ForgottenPassword,
            meta: {
                requiresVisitor: true,
                parent: 'home',
                breadcrumb: [
                    { name: 'Mot de passe oublié' }
                ]
            }
        },
        {
            path: '/CONFIG_ME_IN_ESTARTER',
            name: 'user_confirm_inscription',
            component: customViews.ConfirmInscription || Views.ConfirmInscription,
            meta: {
                requiresVisitor: true,
                parent: 'home',
                breadcrumb: [
                    { name: 'Confirmation d\'inscription' }
                ]
            }
        },
        {
            path: '/CONFIG_ME_IN_ESTARTER',
            name: 'password_reset',
            component: customViews.ResetPassword || Views.ResetPassword,
            meta: {
                requiresVisitor: true
            }
        },
        {
            path: '/CONFIG_ME_IN_ESTARTER',
            name: 'login',
            component: customViews.Login || Views.Login,
            meta: {
                requiresVisitor: true,
                parent: 'home',
                breadcrumb: [
                    { name: 'Connexion' }
                ]
            }
        },
        {
            path: '/CONFIG_ME_IN_ESTARTER',
            name: 'register',
            component: customViews.Register || Views.Register,
            meta: {
                requiresVisitor: true,
                parent: 'home',
                breadcrumb: [
                    { name: 'Inscription' }
                ]
            }
        },
        {
            path: '/CONFIG_ME_IN_ESTARTER',
            name: 'user_profile',
            component: customViews.Profile || Views.Profile,
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
                    path: '/CONFIG_ME_IN_ESTARTER',
                    name: 'user_edit',
                    component: customViews.UpdateProfile || Views.UpdateProfile,
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
                    path: '/CONFIG_ME_IN_ESTARTER',
                    name: 'user_delete',
                    component: customViews.DeleteProfile || Views.DeleteProfile,
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
            path: '/CONFIG_ME_IN_ESTARTER',
            name: 'logout',
            component: customViews.Logout || Views.Logout,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '*',
            name: 'page',
            component: customViews.Page || Views.Page,
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
            component: customViews.NotFoundComponent || Views.NotFoundComponent,
            meta: {
                breadcrumb: [
                    { name: 'Accueil', link: '/' },
                    { name: '404' }
                ]
            }
        }
    ]
}

