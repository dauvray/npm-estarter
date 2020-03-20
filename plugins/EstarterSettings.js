export default  {
     install(Vue, options) {
        Vue.prototype.$estarterSettings = window.estarter.settings
        Vue.prototype.$estarterRoutes = window.estarter.routes
    }
};
