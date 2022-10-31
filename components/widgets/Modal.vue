<template>
    <div>
        <button v-if="showBtn"
                type="button"
                :class="btnclass"
                data-bs-toggle="modal"
                :data-bs-target="`#${target}`">
            <slot name="button">Open modal</slot>
        </button>
        <div class="modal fade"
             :id="`${target}`"
             :ref="`${target}`"
             tabindex="-1"
             role="dialog"
             :aria-labelledby="`#${target}Label`"
             :data-bs-backdrop="backdrop"
             :data-bs-keyboard="keyboard"
             aria-hidden="true">
            <div class="modal-dialog" :class="modalTemplate" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" :id="`#${target}Label`">
                            <slot name="header">Modal title</slot>
                        </h5>
                        <button
                            v-if="closebutton" type="button"
                            class="btn-close close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            @click="cancelChanges"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body">
                                <slot name="body">...</slot>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <button type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    @click="cancelChanges">Annuler</button>
                            <button v-if="canValidate"
                                    type="button"
                                    class="btn btn-primary"
                                    @click="saveChanges">Enregistrer</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Modal } from 'bootstrap'

    export default {
        name: "Modal",
        props: {
            target: {
                type: String,
                required: false,
                defaut: "exampleModal"
            },
            btnclass: {
                type: String,
                required: false,
                default: "btn btn-primary"
            },
            showBtn: {
                type: Boolean,
                required: false,
                default: true
            },
            trigger: {
                type: Boolean,
                required: false,
                default: false
            },
            canValidate: {
                type: Boolean,
                required: false,
                default: false
            },
            modalClasses: {
                type: String,
                required: false,
                default: ''
            },
            backdrop: {
                type: [String, Boolean],
                required: false,
                default: true
            },
            keyboard: {
                type: Boolean,
                required: false,
                default: true
            },
            closebutton: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        data() {
            return {
                modal: null,
                modalEl: null,
                bodyContainer: document.querySelector('body')
            }
        },
        watch: {
            trigger: {
                immediate: true,
                handler (newStatus, oldStatus) {
                    if(newStatus) {
                        setTimeout( () => {
                            this.modal.show()
                        }, 100)
                    } else {
                        setTimeout( () => {
                            this.modal.hide()
                        }, 100)
                    }
                }
            }
        },
        computed: {
            modalTemplate: function() {
                return `${this.modalClasses} modal-fullscreen-md-down`
            }
        },
        mounted() {
            // Hack - see : https://stackoverflow.com/questions/10636667/bootstrap-modal-appearing-under-background
            this.modalEl = document.getElementById(this.target)

            if(this.modalEl) {
                this.modalEl.parentNode.removeChild(this.modalEl)
                this.bodyContainer.append(this.modalEl)

                this.modalEl.addEventListener('show.bs.modal', (e) => {
                    this.$emit('show')
                })
                this.modalEl.addEventListener('show.bs.modal', (e) => {
                    this.$emit('shown')
                })
                this.modalEl.addEventListener('hide.bs.modal', (e) => {
                    this.$emit('hide')
                })
                this.modalEl.addEventListener('hidden.bs.modal', (e) => {
                    this.$emit('hidden')
                })
            }

            this.modal = new Modal(this.$refs[this.target])
        },
        beforeDestroy() {
            this.modal.hide()
            this.modalEl.parentNode.removeChild(this.modalEl)
        },
        methods : {
            saveChanges() {
                this.$emit('saveModalChanges')
                setTimeout( () => {
                    this.modal.hide()
                }, 500)
            },
            cancelChanges() {
                this.$emit('cancelModalChanges')
                setTimeout( () => {
                    this.modal.hide()
                }, 500)
            }
        }
    }
</script>
