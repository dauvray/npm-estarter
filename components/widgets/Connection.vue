<template>

    <ul class="estarter-login navbar-nav">
        <li class="nav-item" v-if="!loggedIn">
            <router-link class="nav-link" :to="{ name: 'login', params: {}}">Connexion</router-link>
        </li>
        <li class="nav-item" v-if="!loggedIn">
            <router-link class="nav-link" :to="{ name: 'register', params: {}}">Inscription</router-link>
        </li>
        <li class="nav-item" v-if="loggedIn">
            <router-link class="nav-link" :to="{ name: 'user_profile', params: {}}">Profil</router-link>
        </li>
        <li class="nav-item" v-if="loggedIn">
            <router-link class="nav-link" :to="{ name: 'logout', params: {}}">Déconnexion</router-link>
        </li>
    </ul>

</template>

<script>

    import {AuthorizationMixin} from 'laravel-estarter/mixins/AuthorizationMixin'

    export default {
        name: 'Connection',
        mixins: [AuthorizationMixin],
        data() {
            return {

            }
        }
    }
</script>
