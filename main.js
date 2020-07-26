// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'es6-promise/auto'
import EstarterSettings from 'vuejs-estarter/plugins/EstarterSettings'
import EstarterCredentials from 'vuejs-estarter/plugins/EstarterCredentials'
import EstarterCustomViews from './components/views'
import EstarterViews from 'vuejs-estarter/components/views'
import store from './state/store'
import router from './router'
import App from './components/App'
import { EventBus } from 'vuejs-estarter/services/eventBus'
import VueNoty from 'vuejs-noty'
import VueMeta from 'vue-meta'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Moment from 'vue-moment'
const moment = require('moment')
require('moment/locale/fr')

let allViews = Object.assign(EstarterViews, EstarterCustomViews)

// LIBRARIES
window._ = require('lodash')
window.axios = axios

try {
    window.Popper = require('popper.js').default
    window.$ = window.jQuery = require('jquery')
    require('bootstrap');
} catch (e) {
}

// AXIOS API TOKEN CONFIGURATION
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
//axios.defaults.baseURL = '/api/'
// let token = document.head.querySelector('meta[name="csrf-token"]')
//
// if (token) {
//     axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
//     axios.defaults.headers.post['Content-Type'] = 'application/json'
// } else {
//     console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')
// }

// VUEJS
// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

Vue.use(VueNoty)
Vue.use(EstarterSettings)
Vue.use(EstarterCredentials)
Vue.use(Moment, {moment})
Vue.use(VueMeta)
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: router,
    store,
    render: (h) => h(App),
    provide: function() {
        return {
            eventBus: EventBus,
            estarterViews: allViews,
            initComponent() {
                this.eventBus.$emit("ResetErrors")
            }
        }
    }
}).$mount('#app')
