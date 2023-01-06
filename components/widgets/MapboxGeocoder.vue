<template>
    <GeocoderComponent
        :mapbox="mapbox"
        @location-updated="onLocation"
        ></GeocoderComponent>
    <MapboxWidget
        v-if="location"
        :location="location"
        ></MapboxWidget>
</template>

<script>

    import GeocoderComponent from './form/fields/GeocoderComponent.vue'
    import MapboxWidget from './Mapbox.vue'

    export default {
        name: 'MapboxGeocoder',
        components: {
            GeocoderComponent,
            MapboxWidget,
        },
        data() {
            return {
                location: null
            }
        },
        props: {
           mapbox: {
               type: [String, Object],
               required: false,
               default: () => {}
           },
        },
        methods: {
            onLocation(location) {
                this.location = location
            }
        }
    }
</script>

<style >

</style>
