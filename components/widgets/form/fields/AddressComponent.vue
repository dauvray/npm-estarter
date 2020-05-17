<template>
    <div>
        <input type="search" :id="AddressInputId" :placeholder="schema.placeholder" />
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
                AddressInputId: `address${Math.floor(Math.random() * Date.now())}`
            }
        },
        mounted() {
            let placesAutocomplete = places({
                appId: this.$estarterCredentials.algoliaAppId,
                apiKey: this.$estarterCredentials.algoliapiKey,
                container: document.querySelector(`#${this.AddressInputId}`)
            }).configure({
                countries: ['fr']
            })
            placesAutocomplete.on('change', (e) => {
                this.updateModelValue(e.suggestion)
            })

            if (typeof this.schema.default === "function") {
                placesAutocomplete.setVal(this.schema.default())
            }

            if(this.model[this.schema.model].value !== undefined) {
                placesAutocomplete.setVal(this.model[this.schema.model].value)
            }
        },
    }
</script>
