<template>
</template>

<script>

    import 'vuejs-noty/dist/vuejs-noty.css'

    export default {
        name: 'Alert',
        inject: ["eventBus"],
        data() {
            return {
                alert: false,
                typeAlert: '',
                alertMessage: '',
            }
        },
        created() {
            this.eventBus.$emit("ResetErrors")
            this.eventBus.$on("httpError", this.handleError)
            this.eventBus.$on("httpSuccess", this.handleSuccess)
            this.eventBus.$on("httpNotFound", this.handleNotFound)
        },
        methods: {
            handleError(err) {
                if(err.response){
                    this.$noty.error(err.response.data.message)
                    for(const error in err.response.data.errors) {
                        this.$noty.error(`${err.response.data.errors[error]}`)
                    }
                } else {
                    this.$noty.error(err)
                }
            },

            handleSuccess(msg) {
                this.$noty.success(msg)
            },

            handleNotFound(msg){
                this.$router.push({'name' : '404'})
            }
        }
    }
</script>
