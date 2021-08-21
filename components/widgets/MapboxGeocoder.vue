<template>
    <div>
        <geocoder-widget 
            :mapbox="mapbox"
            :location="location"
            @geocoder-location="onLocation"
        ></geocoder-widget>
        <mapbox-widget :location="location"></mapbox-widget>
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
                location: {}
            }
        },
        props: {
           mapbox: {
               type: [String, Object],
               required: false,
               default: {}
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
    #estarter-geocoder,
    #estarter-map {
        margin-top: 30px;
    }
    #estarter-geocoder {
        position: absolute;
        top: 0;
        width: 100%;
    }
    #estarter-map {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
    }
</style>
