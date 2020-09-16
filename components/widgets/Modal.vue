<template>
    <div>
        <button type="button" :class="btnclass" data-toggle="modal" :data-target="`#${target}`">
            <slot name="button">Open modal</slot>
        </button>
        <div class="modal fade" :id="`${target}`" tabindex="-1" role="dialog" :aria-labelledby="`#${target}Label`" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" :id="`#${target}Label`">
                            <slot name="header">Modal title</slot>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <slot name="body">...</slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button v-if="canValidate" type="button" class="btn btn-primary" @click="saveChanges">Save changes</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Modal",
        props: {
            target: {
                type: String,
                defaut: "exampleModal"
            },
            btnclass: {
                type: String,
                default: "btn btn-primary"
            }
        },
        data() {
            return {
                canValidate: false
            }
        },
        created() {
            this.$on('canValidate', this.onShowValidButton)
        },
        mounted() {
            // Hack - see : https://stackoverflow.com/questions/10636667/bootstrap-modal-appearing-under-background
            const modal = document.querySelector(`#${this.target}`)
            const bodyContainer = document.querySelector('body')
            modal.parentNode.removeChild(modal)
            bodyContainer.append(modal)

            $(modal).on('show.bs.modal', (e) => {
                this.$emit('showModal')
            })
        },
        beforeDestroy() {
            const modal = document.querySelector(`#${this.target}`)
            const bodyContainer = document.querySelector('body')
            bodyContainer.removeChild(modal)
        },
        methods : {
            onShowValidButton(value) {
                this.canValidate = value
            },
            saveChanges() {
                this.$emit('saveModalChanges')
            }
        }
    }
</script>
