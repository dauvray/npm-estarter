<template>
    <div class="card">
        <div class="card-header">
            <h3>Mise à jour</h3>
        </div>
        <div class="card-body">
            <form @submit.prevent="updateProfile">
            <fieldset>
                <legend>Mes informations</legend>

            <div class="form-group" v-bind:class="{'has-error' : errors.name}">
                <label for="name">Nom</label>
                <input type="text"
                       class="form-control"
                       id="name"
                       aria-describedby="nameHelp"
                       v-model="localUser.name"
                       placeholder="Votre nom" />
                <div v-if="errors && errors.name" class="text-danger">{{ errors.name[0] }}</div>
            </div>

            <div class="form-group" v-bind:class="{'has-error' : errors.email}">
                <label for="email">Email</label>
                <input type="email"
                       class="form-control"
                       id="email"
                       aria-describedby="emailHelp"
                       v-model="localUser.email"
                       placeholder="Votre email" />
                <div v-if="errors && errors.email" class="text-danger">{{ errors.email[0] }}</div>
            </div>

            <div class="form-group" v-bind:class="{'has-error' : errors.password}">
                <label for="password">Mot de passe</label>
                <input type="password"
                       class="form-control"
                       id="password"
                       placeholder="Password" />
                <div v-if="errors && errors.password" class="text-danger">{{ errors.password[0] }}</div>
            </div>

            <div class="form-group">
                <label for="confirm-password">Confirmation assword</label>
                <input type="password"
                       class="form-control"
                       id="confirm-password"
                       placeholder="Password" />
            </div>

            <input type="button" class="btn btn-primary" value="Annuler" @click="cancelUpdate" />
            <input type="submit" class="btn btn-primary" value="Envoyer" />

            </fieldset>
        </form>
        </div>
    </div>
</template>

<script>

    import { mapActions, mapGetters} from 'vuex'
    import {BaseMixin} from 'laravel-estarter/mixins/BaseMixin'

    export default {
        name: 'UpdateProfile',
        mixins: [BaseMixin],
        data() {
            return {
                localUser: {}
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/getUser'
            }),
        },
        created() {
            this.localUser = {...this.user}
            this.eventBus.$on("httpError", this.handleError)
            this.eventBus.$on("httpSuccess", this.handleSuccess)
            this.setBreadcrumb(this.$route.meta.breadcrumb)
        },
        methods: {
            ...mapActions([
                'auth/updateUser',
            ]),
            cancelUpdate() {
                this.$router.push({name: 'user_profile'})
            },
            updateProfile (e) {
                this['auth/updateUser'](this.localUser)
            },
            handleError(err) {
                this.errors = err.response.data.errors
            },
            handleSuccess(msg) {
                this.errors = {}
                this.$router.push({name: 'user_profile'})
            },
        }
    }
</script>
