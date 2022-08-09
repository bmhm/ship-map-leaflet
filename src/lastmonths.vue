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


//import NavBar from './components/NavBar.vue'
//import MyTimePicker from './components/MyDatePicker.vue'

import elasticQueryLastMonth from './elasticLastMonth.js';


export default {
  name: 'LastMonth',
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
      this.pullElastic();
    },
    data () {
      let locations = []
      let customicon = icon(Object.assign({},
        Icon.Default.prototype.options,
        {iconUrl, iconRetinaUrl, shadowUrl}
      ))
      return {
        locations,
        icon: customicon,
        clusterOptions: {},
        initialLocation: latLng(42.36694, -82.89711)
      }
    },
  methods: {
    click: (e) => console.log("clusterclick", e),
    ready: (e) => console.log('ready', e),
    async pullElastic () {
        console.log ('ENTER ASYNC!!!')
        const resp = await elasticQueryLastMonth('ais_v7')
        let i = 0;
        resp.data.hits.hits.map( (record) => {
          console.log ('SETTING LOCATIONS')
            this.locations.push({
              id: i,
              latlng: latLng(record._source.data.Latitude, record._source.data.Longitude),
              text: 'Hola ' + i
            })
            i++
            console.log(record._source.data.Latitude + record._source.data.Longitude)
        });
        console.log('FINISH ASYNC!!')
      }
    },


}

</script>