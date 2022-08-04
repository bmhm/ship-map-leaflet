<template>
  <v-map class="a" :zoom=10 :center="initialLocation">
    <v-icondefault></v-icondefault>
    <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
    <v-marker-cluster :options="clusterOptions" @clusterclick="click()" @ready="ready">
      <v-marker v-for="l in locations" :key="l.id" :lat-lng="l.latlng" :icon="icon">
        <v-popup :content="l.text"></v-popup>
      </v-marker>
    </v-marker-cluster>
  </v-map>
</template>

<script>
import * as Vue2Leaflet from 'vue2-leaflet'
import { latLng, Icon, icon } from 'leaflet'
import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'

export default {
  name: 'MyMap',
  propts: ['mapdata'],
  components: {
    'v-map': Vue2Leaflet.LMap,
    'v-tilelayer': Vue2Leaflet.LTileLayer,
    'v-icondefault': Vue2Leaflet.LIconDefault,
    'v-marker': Vue2Leaflet.LMarker,
    'v-popup': Vue2Leaflet.LPopup,
    'v-marker-cluster': Vue2LeafletMarkercluster,
  },
  mounted() {
    setTimeout(() => {
      console.log('done')
      this.$nextTick(() =>{
        this.clusterOptions = { disableClusteringAtZoom: 11 }
      });
    }, 5000);
  },
  methods: {
    click: (e) => console.log("clusterclick", e),
    ready: (e) => console.log('ready', e),
  },
  data () {
    let locations = this.mapdata
    let customicon = icon(Object.assign({},
      Icon.Default.prototype.options,
      {iconUrl, iconRetinaUrl, shadowUrl}
    ))
    return {
      locations,
      icon: customicon,
      clusterOptions: {},
      initialLocation: latLng(41.1122176, -100.6346596)
    }
  },

  };


</script>

<style scoped>
  @import "~leaflet/dist/leaflet.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
  html, body {
    height: 100%;
    margin: 0;
  }
  .a {
    height: 100%;
    margin: 0;
  }
</style>
