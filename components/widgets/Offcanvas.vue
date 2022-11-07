<template>
    <div>
        <button v-if="showBtn"
                type="button"
                :class="btnclass"
                data-bs-toggle="offcanvas"
                :data-bs-target="`#${target}`">
            <slot name="button">Open offcanvas</slot>
        </button>
        <div :class="offcanvasTemplate"
            :id="`${target}`"
            :ref="`${target}`"
            tabindex="-1"
            role="dialog"
            :aria-labelledby="`#${target}Label`"
            :data-bs-backdrop="backdrop"
            :data-bs-keyboard="keyboard"
            :data-bs-scroll="scroll"
            >
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" :id="`#${target}Label`">
                    <slot name="header">Offcanvas title</slot>
                </h5>
                <button
                    v-if="closebutton"
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    @click="cancelChanges"
                    ></button>
            </div>

            <div class="offcanvas-body">
                <div class="card">
                    <div class="card-body">
                        <slot name="body">...</slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { Offcanvas } from 'bootstrap'

    export default {
        name: 'Offcanvas',
        props: {
            target: {
                type: String,
                required: false,
                defaut: "exampleOffcanvas"
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
            scroll: {
                type: Boolean,
                required: false,
                default: true
            },
            closebutton: {
                type: Boolean,
                required: false,
                default: true
            },
            direction: {
                type: String,
                required: false,
                default: 'offcanvas-start'
            },
            responsive: {
                type: String,
                required: false,
                default: 'offcanvas'
            }
        },
        data() {
            return {
                offcanvas: null,
                offcanvasEl: null,
            }
        },
        watch: {
            trigger: {
                immediate: true,
                handler (newStatus, oldStatus) {
                    if(newStatus) {
                        setTimeout( () => {
                            this.offcanvas.show()
                        }, 100)
                    } else {
                        setTimeout( () => {
                            this.offcanvas.hide()
                        }, 100)
                    }
                }
            }
        },
        computed: {
           offcanvasTemplate: function() {
                return `${this.responsive} ${this.direction}`
            }
        },
        mounted() {

            this.offcanvasEl = document.getElementById(this.target)

            if(this.offcanvasEl) {

                this.offcanvasEl.addEventListener('show.bs.offcanvas', (e) => {
                    this.$emit('show')
                })
                this.offcanvasEl.addEventListener('shown.bs.offcanvas', (e) => {
                    this.$emit('shown')
                })
                this.offcanvasEl.addEventListener('hide.bs.offcanvas', (e) => {
                    this.$emit('hide')
                })
                this.offcanvasEl.addEventListener('hidden.bs.offcanvas', (e) => {
                    this.$emit('hidden')
                })
            }

            this.offcanvas = new bootstrap.Offcanvas(this.$refs[this.target])
        },
        beforeDestroy() {
            this.offcanvas.hide()
            this.offcanvasEl.parentNode.removeChild(this.offcanvasEl)
        },
        methods : {
            saveChanges() {
                this.$emit('saveOffcanvasChanges')
                setTimeout( () => {
                    this.offcanvas.hide()
                }, 500)
            },
            cancelChanges() {
                this.$emit('canceOffcanvasChanges')
                setTimeout( () => {
                    this.offcanvas.hide()
                }, 500)
            }
        }
    }

</script>
