<template>
    <div  class="status-online"
          :class="[{
            'bg-success': user.is_online,
            'bg-danger': !user.is_online ,
            }, classStatus]"
    ></div>
</template>

<script>
    export default {
        name: 'GravatarStatus',
        props: {
            user: {
                type: Object,
                required: true
            },
            size: {
                type: String,
                required: false,
                default: 'small'
            }
        },
        computed: {
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
        opacity: 0.6;
    }
</style>
