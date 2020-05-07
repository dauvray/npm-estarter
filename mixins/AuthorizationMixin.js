import {mapState, mapGetters} from 'vuex'

export const AuthorizationMixin = {
    computed: {
        ...mapGetters('auth', [
            'loggedIn'
        ])
    },
    created() {
        this.unsubscribe = this.$store.subscribe((mutation, state) => {
            if(mutation.type === 'auth/setLogin'){
                if(state.auth.isLoggedin) {
                    this.onLogin()
                }
            }

            if(mutation.type === 'auth/setLogout'){
                if(!state.auth.isLoggedin) {
                    this.onLogout()
                }
            }
        })
    },
    beforeDestroy() {
        this.unsubscribe();
    },
    methods: {
        // to execute on login
        onLogin() {},
        // to execute en logout
        onLogout() {},
        // can do action for settings
        canDoIt(global_setting = null, local_setting = null, item = null) {

            if(!item){
                return false
            }

            // global authorization
            if(!this.$estarterSettings.hasOwnProperty(global_setting)){
                return false
            }
            // item authorization
            if(item.hasOwnProperty('extras') && !item.extras.hasOwnProperty(local_setting)) {
                return false
            }
            return true
        }
    }
}
