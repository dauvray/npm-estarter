<template>
    <div>
        <div id="estarter-geocoder"></div>
        <input type="hidden" :name="name" :value="JSON.stringify(location)" />
    </div>
</template>

<script>
    import { abstractField } from "vue-form-generator"
    import mapboxgl from "mapbox-gl"
    import "mapbox-gl/dist/mapbox-gl.css"
    import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
    import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"

    export default {
        name: 'GeocoderComponent',
        mixins: [abstractField],
        components: {
           'MapWidget': () => import('../../Mapbox')
        },
        props: {
           name: {
               type: String,
               required: false,
               default: 'geocoder'
           },
           mapbox: {
               type: [String, Object],
               required: false,
               default: () => {}
           },
            types: {
               type: String,
                required: false,
                default: 'country,region,place,postcode,locality,neighborhood,address'
            }
        },
        data() {
            return {
                location: {},
                access_token: process.env.MIX_MAPBOX_ACCESS_TOKEN,
            }
        },
        mounted() {

            // is formdesigner or standAlone ?
            let data
            if(_.isEmpty(this.mapbox)) {
                data = this.value
            } else {
                data = this.mapbox
            }

            if(typeof data === 'string') {
                this.location = JSON.parse(data)
            } else {
                this.location = {...data}
            }

            this.createGeocoder()

            if(this.location.place_name) {
                this.setLocation()
            }

        },
        methods: {
            createGeocoder() {

                mapboxgl.accessToken = this.access_token

                const geocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    types: this.types
                });

                geocoder.addTo('#estarter-geocoder');

                // Add geocoder result to container.
                geocoder.on('result', (e) => {
                    this.location = e.result
                    this.setLocation()
                });

                // Clear results container when search is cleared.
                geocoder.on('clear', () => {
                    this.location = {}
                });
            },
            setLocation() {
                document.querySelector('.mapboxgl-ctrl-geocoder--input').value = this.location.place_name
                this.$emit("model-updated", this.location)
            }
        }
    }
</script>

<style lang="scss">
        .mapboxgl-ctrl-geocoder {
        box-shadow: none;
        border: 1px solid rgba(0,40,100,.12);
        border-radius: 3px;
        width: 100%!important;
        max-width: 100%!important;
    }
</style>
