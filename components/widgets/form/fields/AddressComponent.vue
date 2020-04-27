<template>
    <div>
        <input type="search" id="address-input" :placeholder="schema.placeholder" />
        {{hint}}
    </div>
</template>

<script>
    import { abstractField } from "vue-form-generator"
    const places = require('places.js');

    export default {
        name: 'AddressComponent',
        mixins: [abstractField],
        data() {
            return {
                hint: '',
            }
        },
        mounted() {
            let placesAutocomplete = places({
                appId: this.$estarterCredentials.algoliaAppId,
                apiKey: this.$estarterCredentials.algoliapiKey,
                container: document.querySelector('#address-input')
            }).configure({
                countries: ['fr']
            })
            placesAutocomplete.on('change', (e) => {
                this.updateModelValue(e.suggestion)
            })
            if (typeof this.schema.default === "function") {
                placesAutocomplete.setVal(this.schema.default())
            }
        },
    }
</script>
