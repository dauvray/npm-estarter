import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin'

export default {
    setBreadcrumbs( breadcrumbs) {
         this.breadcrumbs = [...breadcrumbs]
    },
}
