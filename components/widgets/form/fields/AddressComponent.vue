<template>
    <div>
        <input type="search" id="address-input" placeholder="Where are we going?" />
        <input type="hidden" value="" name="address-input-json" />
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
                appId: 'plU39WL34594',
                apiKey: '75e0a6a31b9c80c4a3ef1aba2aace355',
                container: document.querySelector('#address-input')
            }).configure({
                countries: ['fr']
            })
            placesAutocomplete.on('change', function(e) {
                console.log(e.suggestion)
            });
        },
    }
</script>
