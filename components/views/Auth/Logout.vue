<script>

    import { mapActions} from 'vuex'

    export default {
        name: 'Logout',
        created() {
            this['auth/logout']()
                .then(response => {
                    this.$router.push({name: 'home'});
                    //document.location.reload(true);
                });
        },
        methods: {
            ...mapActions([
                'auth/logout',
            ]),
        }
    }
</script>
