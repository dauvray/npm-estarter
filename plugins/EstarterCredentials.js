export default  {
    install(Vue, options) {
        Vue.prototype.$estarterCredentials = {
            algoliaAppId: '*********',
            algoliapiKey: '*********'
        }
    }
};