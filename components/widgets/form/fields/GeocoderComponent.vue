<template>
    <div>
        <div id="estarter-geocoder"></div>
        <input type="hidden" :name="name" :value="JSON.stringify(location)" />
    </div>
</template>

<script>
    import mapboxgl from "mapbox-gl"
    import "mapbox-gl/dist/mapbox-gl.css"
    import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
    import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"

    export default {
       name: 'GeocoderComponent',
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
               default: {}
           },
       },
       data() {
           return {
               location: {},
               access_token: process.env.MIX_MAPBOX_ACCESS_TOKEN,
            }
       },
       mounted() {

            if(typeof this.mapbox === 'string') {
                this.location = JSON.parse(this.mapbox)
            } else {
                this.location = {...this.mapbox}
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
                    types: 'country,region,place,postcode,locality,neighborhood,address'
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
                this.$emit('geocoder-location', this.location)
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