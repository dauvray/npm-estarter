import Vue from 'vue'
import Router from 'vue-router'
// Adds a loading bar at the top during page loads.
import NProgress from 'nprogress/nprogress'
import 'nprogress/nprogress.css'
import store from 'vuejs-estarter/state/store'

Vue.use(Router)

let allRoutes = []

// Allow us to dynamically require all files.
// https://webpack.js.org/guides/dependency-management/#require-context
const requireRoute = require.context(
    // Search for files in the current directory.
    '.',
    // Search for files in subdirectories.
    true,
    // Include any .js files that are not this file or a unit test.
    /^((?!index|\.unit\.).)*\.js$/
)

// For every Route module...
requireRoute.keys().forEach((fileName) => {

    // Get the path and remove the file extension from the end.
    const routePath = fileName.replace(/\.\w+$/, '')

    require(`${routePath}`).default.forEach(item => {

        // set path from config laravel
        if(window.estarter.routes[item.name] !== undefined){

            // change laravel variable to vuejs variable
            item.path = window.estarter.routes[item.name]

            if(item.children !== undefined){
                item.children.forEach(children => {
                    if(window.estarter.routes[children.name] !== undefined){
                        children.path = window.estarter.routes[children.name]
                    }
                })
            }
        }
        allRoutes.push(item)
    })
})

const router =  new Router({
    base: window.estarter.settings.spa_prefix || null,
    routes: allRoutes,
    // Use the HTML5 history API (i.e. normal-looking routes)
    // instead of routes with hashes (e.g. example.com/#/about).
    // This may require some server configuration in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    mode: 'history',
    // Simulate native-like scroll behavior when navigating to a new
    // route and using back/forward buttons.
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
})

router.beforeEach((to, from, next) => {

    // If this isn't an initial page load...
    if (from.name !== null) {
        // Start the route progress bar.
        NProgress.start()
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters['auth/loggedIn']) {
            next({
                name: 'login',
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters['auth/loggedIn']) {
            next({
                name: 'profile',
            })
        } else {
            next()
        }

    } else {
        next() // make sure to always call next()!
    }
})

// When each route is finished evaluating...
router.afterEach((routeTo, routeFrom) => {
    // Complete the animation of the route progress bar.
    NProgress.done()
})

export default router
