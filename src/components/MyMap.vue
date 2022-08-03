<template>
<div>
  <DatesChange
    @CustomeEventDateChange = "changeDate">
  </DatesChange>
  <v-map class="a" :zoom=10 :center="initialLocation">
    <v-icondefault></v-icondefault>
    <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
    <v-marker-cluster :options="clusterOptions" @clusterclick="click()" @ready="ready">
      <v-marker v-for="l in locations" :key="l.id" :lat-lng="l.latlng" :icon="icon">
        <v-popup :content="l.text"></v-popup>
      </v-marker>
    </v-marker-cluster>
  </v-map>
</div>
</template>

<script>
import * as Vue2Leaflet from 'vue2-leaflet'
import { latLng, Icon, icon } from 'leaflet'
import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'


import elasticQueryDate from './elastic_date.js';
import DatesChange from './MyDatePicker.vue'


export default {
  name: 'MyMap',
  components: {
    'v-map': Vue2Leaflet.LMap,
    'v-tilelayer': Vue2Leaflet.LTileLayer,
    'v-icondefault': Vue2Leaflet.LIconDefault,
    'v-marker': Vue2Leaflet.LMarker,
    'v-popup': Vue2Leaflet.LPopup,
    'v-marker-cluster': Vue2LeafletMarkercluster,
     DatesChange,
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
  methods: {
    click: (e) => console.log("clusterclick", e),
    ready: (e) => console.log('ready', e),
    async pullElastic () {
      console.log ('ENTER ASYNC!!!')
      //let startdate = '2022-01-02T00:00:00Z'
      //let enddate = '2022-01-02T00:00:02Z'
      //console.log('heres the dates ' + this.value1.start + ' ' + this.value2)
      let startdate = this.value1
      let enddate = this.value1
      const resp = await elasticQueryDate('ais_v7', startdate, enddate)
      let i = 0;
      resp.data.hits.hits.map( (record) => {
        console.log ('SETTING LOCATIONS')
        this.locations.push({
          id: i,
          latlng: latLng(record._source.data.Latitude, record._source.data.Longitude),
          text: 'Vessel Name:' + record._source.data.VesselName +'\n Call Sign: '   + record._source.data.CallSign
            + '\n Vessel Type: ' + record._source.data.VesselType
        })
        i++
        //console.log(record._source.data.Latitude + record._source.data.Longitude + record._source.data.VesselName)
      });
      console.log('FINISH ASYNC!!')
    },
    changeDates (data){
      this.value1 = data.value1;
      this.value2 = data.value2;
    }
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
