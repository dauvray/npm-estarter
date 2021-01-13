<template>
    <div>
        <button v-if="showBtn" type="button" :class="btnclass" data-toggle="modal" :data-target="`#${target}`">
            <slot name="button">Open modal</slot>
        </button>
        <div class="modal fade" :id="`${target}`" tabindex="-1" role="dialog" :aria-labelledby="`#${target}Label`" aria-hidden="true">
            <div class="modal-dialog" :class="modalClasses" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" :id="`#${target}Label`">
                            <slot name="header">Modal title</slot>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelChanges">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <slot name="body">...</slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancelChanges">Close</button>
                            <button v-if="canValidate" type="button" class="btn btn-primary" data-dismiss="modal" @click="saveChanges">Save changes</button>
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
                default: ''
            }
        },
        watch: {
            trigger: {
                immediate: true,
                handler (newStatus, oldStatus) {
                    if(newStatus) {
                        setTimeout( () => {
                            $(`#${this.target}`).modal('show')
                        }, 100)
                    } else {
                        setTimeout( () => {
                            $(`#${this.target}`).modal('hide')
                        }, 100)
                    }
                }
            }
        },
        data() {
            return {
                modal: `#${this.target}`,
                bodyContainer: document.querySelector('body')
            }
        },
        mounted() {
            // Hack - see : https://stackoverflow.com/questions/10636667/bootstrap-modal-appearing-under-background
            let modal = document.querySelector(this.modal)
            modal.parentNode.removeChild(modal)
            this.bodyContainer.append(modal)

            $(this.modal).on('show.bs.modal', (e) => {
                this.$emit('show')
            })
            $(this.modal).on('show.bs.modal', (e) => {
                this.$emit('shown')
            })
            $(this.modal).on('hide.bs.modal', (e) => {
                this.$emit('hide')
            })
            $(this.modal).on('hidden.bs.modal', (e) => {
                this.$emit('hidden')
            })
        },
        beforeDestroy() {
            $(`#${this.target}`).modal('hide')
            let modal = document.querySelector(this.modal)
            modal.parentNode.removeChild(modal)
        },
        methods : {
            saveChanges() {
                this.$emit('saveModalChanges')
                setTimeout( () => {
                    $(`#${this.target}`).modal('hide')
                }, 100)
            },
            cancelChanges() {
                this.$emit('cancelModalChanges')
                setTimeout( () => {
                    $(`#${this.target}`).modal('hide')
                }, 100)
            }
        }
    }
</script>
