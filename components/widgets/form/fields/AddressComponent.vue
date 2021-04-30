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
            this.updateModelValue({
                address: e.suggestion.value,
                geo: e.suggestion.latlng

            })
        })
        placesAutocomplete.on('clear', (e) => {
            this.updateModelValue({
                address: '',
                geo: {}

            })
        })
        setTimeout(() => {
            if(this.model && this.model[this.schema.model]) {
                // le premier argument est pour les anciennes versions ( obsolete, disparaitra bientot )
                placesAutocomplete.setVal(this.model[this.schema.model].value || this.model[this.schema.model].address)
            }
        }, 500);
    },
}
</script>
