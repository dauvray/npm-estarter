<template>
    <div>
        <input type="search" :id="AddressInputId" :placeholder="schema.placeholder" />
        {{hint}}
    </div>
</template>

<script>
    import { abstractField } from "vue-form-generator"
    import {get as objGet, isFunction} from "lodash";
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
                appId: this.schema.appId,
                apiKey: this.schema.apiKey,
                container: document.querySelector(`#${this.AddressInputId}`)
            }).configure({
                countries: ['fr']
            })
            placesAutocomplete.on('change', (e) => {
                this.updateModelValue(e.suggestion.value)
            })

            if(this.model && this.model[this.schema.model]) {
                placesAutocomplete.setVal(this.model[this.schema.model].value || this.model[this.schema.model])
            }
        },
    }
</script>
