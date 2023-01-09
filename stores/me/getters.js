export default {
    getCanIdo: (state) => (permission, id = null, allowed_role = []) => {
        // default
        if(id == null) {
            return state.permissions.includes(permission)
        }
        // specified roles can always do
        if(allowed_role.length) {
            if(state.permissions.includes(permission) && state.roles.some(r=> allowed_role.indexOf(r) >= 0)) {
                return true
            }
        }
        // only mine
        return state.permissions.includes(permission) && state.id == id
    },
    getMe: (state) => {
        // todo en fonction des besoins
        return state.id
    },
    logged: (state) => {
        return state.hasOwnProperty('id')
    }
}
