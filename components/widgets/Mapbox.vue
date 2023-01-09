<template>
     <div id="estarter-map"></div>
</template>

<script>
    import mapboxgl from "mapbox-gl"
    import "mapbox-gl/dist/mapbox-gl.css"
    import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.min.js"
    import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"

    export default {
        name: 'Mapbox',
        props: {
            location: {
                type: Object,
                required: true,
            },
            zoom: {
               type: Number,
               required: false,
               default: 10
           },
           layout: {
               type: String,
               required: false,
               default: 'mapbox://styles/mapbox/streets-v11'
           }
        },
        data() {
           return {
               map: null,
               marker: null,
               access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
            }
       },
         watch: {
            location: function (newLocation, oldLocation) {
                this.setLocation()
            }
        },
       mounted() {
           this.createMap()
       },
       methods: {
           createMap() {
                 mapboxgl.accessToken = this.access_token

                this.map = new mapboxgl.Map({
                    container: 'estarter-map', // Container ID
                    style: this.layout, // Map style to use
                    center: this.location.center, // Starting position [lng, lat]
                    zoom: this.zoom, // Starting zoom level
                })

                this.setLocation()
           },
           setLocation() {

                this.map.flyTo({
                    center: this.location.center,
                    essential: true
                })

                if (this.marker) {
                    this.marker.remove();
                }

                this.marker = new mapboxgl.Marker() // initialize a new marker
                .setLngLat(this.location.center) // Marker [lng, lat] coordinates
                .addTo(this.map); // Add the marker to the map
           }
       }
    }
</script>

<style lang="scss" >

</style>
