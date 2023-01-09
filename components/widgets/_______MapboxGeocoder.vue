<template>
    <div class="mapbox-geocoder">
        <GeocoderComponent
            :mapbox="mapbox"
            @location-updated="onLocation"
            ></GeocoderComponent>
        <MapboxWidget
            v-if="location"
            :location="location"
            ></MapboxWidget>
    </div>
</template>

<script>

    import GeocoderComponent from 'vuejs-estarter/components/widgets/form/fields/GeocoderComponent.vue'
    import MapboxWidget from 'vuejs-estarter/components/widgets/Mapbox.vue'

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

