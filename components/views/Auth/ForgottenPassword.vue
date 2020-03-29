<template>

    <section id="forgotten-password-page" class=" container">
        <h1>Mot de passe oublié</h1>
        <div class="row">
            <div class="col-md-6">
                <forgotten-password-form></forgotten-password-form>
            </div>
        </div>
    </section>

</template>

<script>

    import {BaseMixin} from 'vuejs-estarter/mixins/BaseMixin'

    export default {
        name: 'ForgottenPassword',
        mixins: [BaseMixin],
        components: {
            ForgottenPasswordForm: () => import('vuejs-estarter/components/widgets/form/ForgottenPassword')
        },
        data() {
            return {}
        },
        created() {
            this.setBreadcrumb(this.$route.meta.breadcrumb)
        },
        methods: {
        }
    }
</script>
