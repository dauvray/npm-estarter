<script>
    export default {
        name: 'Alert',
        inject: ["eventBus", 'AWN'],
        data() {
            return {
                options: {
                    labels: {
                        warning: 'Signalement',
                        alert: 'Erreur',
                        success: 'Confirmation',
                        info: 'Information',
                        tip: 'Astuce',
                    },
                    icons: {
                        enabled: true,
                        prefix : '<i class="lar las la-',
                        suffix: '"></i>',
                        warning: 'exclamation-triangle',
                        alert: 'exclamation',
                        success:'check',
                        info: 'info',
                        tip: 'lightbulb',
                    }
                },
            }
        },
        created() {
            this.eventBus.$emit("ResetErrors")
            this.eventBus.$on("httpError", this.handleError)
            this.eventBus.$on("httpSuccess", this.handleSuccess)
            this.eventBus.$on("httpNotFound", this.handleNotFound)
        },
        methods: {
            handleError(msg, options = {}, errors = {}) {
                this.AWN.alert(msg, {...this.options, ...options})
                errors.forEach(error => {
                    this.AWN.alert(error.message, {...this.options, ...error.options})
                })
            },
            handleSuccess(msg, options = {}) {
                this.AWN[options.type || 'success'](msg, {...this.options, ...options})
            },
            handleNotFound(msg){
                this.$router.push({'name' : '404'})
            },
        }
    }
</script>
