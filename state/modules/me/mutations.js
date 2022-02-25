export default {
    setMe(state, user) {
        state.me = {...user}
    },
    // add data from other packages
    composeMe(state, user) {
        state.me = {...state.me, ...user}
    }
}
