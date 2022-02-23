export default {
    getCanIdo: (state) => (permission, id = null, allowed_role = []) => {
        // default
        if(id == null) {
            return state.me.permissions.includes(permission)
        }
        // specified roles can always do
        if(allowed_role.length) {
            if(state.me.permissions.includes(permission) && state.me.roles.some(r=> allowed_role.indexOf(r) >= 0)) {
                return true
            }
        }
        // only mine
        return state.me.permissions.includes(permission) && state.me.id == id
    },
    getMe(state) {
        return state.me
    }
}
