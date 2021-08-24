<template>
    <div>
        <geocoder-widget
            :mapbox="mapbox"
            @location-updated="onLocation"
        ></geocoder-widget>
        <mapbox-widget v-if="location" :location="location"></mapbox-widget>
    </div>
</template>

<script>

    export default {
        name: 'MapboxGeocoder',
        components: {
            GeocoderWidget: () => import('./form/fields/GeocoderComponent'),
            MapboxWidget: () => import('./Mapbox')
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
