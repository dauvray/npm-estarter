import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin'

export default {
    setBreadcrumbs( breadcrumbs ) {
         this.breadcrumbs = [...breadcrumbs]
    },
    setConfig(newConfig) {
        this.config = {...this.config, ...newConfig}
    }
}
