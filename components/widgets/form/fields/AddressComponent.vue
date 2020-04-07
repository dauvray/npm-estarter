<template>
    <div>
        <input type="search" id="address-input" placeholder="Where are we going?" />
    </div>
</template>

<script>
    import { abstractField } from "vue-form-generator"
    const places = require('places.js');

    export default {
        name: 'AddressComponent',
        mixins: [abstractField],
        mounted() {
            let placesAutocomplete = places({
                appId: this.$estarterCredentials.algoliaAppId,
                apiKey: this.$estarterCredentials.algoliapiKey,
                container: document.querySelector('#address-input')
            }).configure({
                countries: ['fr']
            })
            placesAutocomplete.on('change', (e) => {
                this.updateModelValue(e.suggestion);
            });
        },
    }
</script>
