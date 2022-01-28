<template>
    <div v-if="user">
        <gravatar-status
            size="small"
            :user="user"
        ></gravatar-status>

    </div>
</template>

<script>
    import {RestDataSourcesMixin} from 'vuejs-estarter/mixins/RestDataSourcesMixin'
    export default {
        name: "Server",
        inject: ["eventBus"],
        components: {
            GravatarStatus: () => import('vuejs-estarter/components/widgets/GravatarStatus'),
        },
        mixins: [
            RestDataSourcesMixin
        ],
        props: {
            //this may be the laravel connected user
           mainid: {
               type: Number,
               required: false,
               default: null
           }
        },
        data() {
            return {
                user: null,
            }
        },
        created() {
            // get main user
            if (sessionStorage.getItem("applicationUser")) {
                const data = JSON.parse(sessionStorage.getItem("applicationUser"))
                // this is the real logged user
                if(data.id == this.mainid) {
                    this.user = data
                } else {
                    this.loadUser()
                }

            } else {
                this.loadUser()
            }

            // init bus events
            this.eventBus.$on('who-am-i', this.sendUser)
        },
        methods: {
            sendUser() {
                this.eventBus.$emit('here-i-am', this.user)
            },
            loadUser() {
                this.requestApi('/get-user-data')
                    .then(response => {
                        sessionStorage.setItem('applicationUser', JSON.stringify(response.user))
                        this.user = response.user
                    })
            }
        }
    }
</script>

<style scoped>

</style>
