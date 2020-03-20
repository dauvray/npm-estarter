<template>
    <div v-if="canshare">
        <sharing-facebook v-if="cansharefacebook"
            :page_url="currentPage"
            has_icon
        ></sharing-facebook>
        <sharing-pinterest v-if="cansharepinterest"
            :page_url="currentPage"
            has_icon
        ></sharing-pinterest>
        <sharing-tumblr v-if="cansharetumblr"
            :page_url="currentPage"
           has_icon
        ></sharing-tumblr>
        <sharing-linkedin v-if="cansharelinkedin"
            :page_url="currentPage"
            has_icon
        ></sharing-linkedin>
        <sharing-twitter v-if="cansharetwitter"
            :page_url="currentPage"
            has_icon
        ></sharing-twitter>
        <sharing-email v-if="canshareemail"
            :page_url="currentPage"
            has_icon
        ></sharing-email>
    </div>
</template>

<script>

    export default {
        name: 'SocialPage',
        components: {
            SharingFacebook: () => import('vue-goodshare/src/providers/Facebook.vue'),
            SharingPinterest: () => import('vue-goodshare/src/providers/Pinterest.vue'),
            SharingTumblr: () => import('vue-goodshare/src/providers/Tumblr.vue'),
            SharingLinkedin: () => import('vue-goodshare/src/providers/LinkedIn.vue'),
            SharingTwitter: () => import('vue-goodshare/src/providers/Twitter.vue'),
            SharingEmail: () => import('vue-goodshare/src/providers/Email.vue'),
        },
        data() {
            return {
                currentPage: window.location.href,
            }
        },
        props: {
            item: Object,
            canshare: {
                type: Boolean,
                default: false
            },
            cansharefacebook: {
                type: Boolean,
                default: false
            },
            cansharepinterest: {
                type: Boolean,
                default: false
            },
            cansharetumblr: {
                type: Boolean,
                default: false
            },
            cansharelinkedin: {
                type: Boolean,
                default: false
            },
            cansharetwitter: {
                type: Boolean,
                default: false
            },
            canshareemail: {
                type: Boolean,
                default: false
            }
        }
    }

</script>
