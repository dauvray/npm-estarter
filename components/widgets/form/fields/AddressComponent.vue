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
        props: {
            appId: {
                type: String,
                default: '******'
            },
            apiKey: {
                type: String,
                default: '******'
            }
        },
        data() {
            return {
                hint: '',
                AddressInputId: `address${Math.floor(Math.random() * Date.now())}`
            }
        },
        mounted() {
            let placesAutocomplete = places({
                appId: this.appId,
                apiKey: this.apiKey,
                container: document.querySelector(`#${this.AddressInputId}`)
            }).configure({
                countries: ['fr']
            })
            placesAutocomplete.on('change', (e) => {
                this.updateModelValue(e.suggestion)
            })

            if(this.model && this.model[this.schema.model]) {
                placesAutocomplete.setVal(this.model[this.schema.model].value || this.model[this.schema.model])
            }
        },
    }
</script>
