<template>
    <section id="confirm-inscription-page" class=" container">
        <div class="row">
            <div class="col-6">
                <div class="alert alert-success" role="alert">
                    Inscription validée vous pouvez utiliser vos identifiants pour vous connecter
                </div>
            </div>
        </div>
    </section>
</template>

<script>

    import {BaseMixin} from 'vuejs-estarter/mixins/BaseMixin'

    export default {
        name: 'ConfirmInscription',
        mixins: [BaseMixin],
        data() {
            return {}
        },
        created() {
            this.setBreadcrumb(this.$route.meta.breadcrumb)
        },
    }
</script>
