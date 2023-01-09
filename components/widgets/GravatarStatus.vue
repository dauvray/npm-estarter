<template>
    <div class="status-online"
        :class="[{
            'bg-success': is_online,
            'bg-danger': !is_online,
            }, classStatus]"
    ></div>
</template>

<script>

    import { mapState } from 'pinia'
    import { useMeStore } from '../../stores/me.js'

    export default {
        name: 'GravatarStatus',
        props: {
            size: {
                type: String,
                required: false,
                default: 'small'
            }
        },
        computed: {
            ...mapState(useMeStore, ['is_online']),
            classStatus: function () {
                return {
                    'small-status': this.size == 'small',
                    'medium-status': this.size == 'medium'
                }
            }
        }
    }
</script>

<style>
    .small-status {
        width: 16px;
        height: 16px;
    }

    .medium-status {
        width: 32px;
        height: 32px;
    }

    .status-online {
        border-radius: 50px;
        position: absolute;
        bottom: 0;
        right: 0;
        border: 2px solid #444;
    }
</style>
