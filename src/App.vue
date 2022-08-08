<template>
  <div id="app">
    <nav-bar />
    <my-time-picker v-on:CustomEventDatesChanged="pullElastic($event)"></my-time-picker>
    <my-map :mapdata="mapdata"></my-map>/>
  </div>
</template>

<script>
import MyMap from './components/MyMap.vue'
import NavBar from './components/NavBar.vue'
import MyTimePicker from './components/MyDatePicker.vue'

import elasticQueryDate from './components/elastic_date.js';
//import DatesChange from './components/MyDatePicker.vue'
import { latLng} from 'leaflet';


export default {
  name: 'App',
  components: {
    'my-map': MyMap,
    'nav-bar': NavBar,
    'my-time-picker':MyTimePicker
    //DatesChange,
  },
  mounted() {
    //this.pullElastic();
  },
  

   methods: {
     async pullElastic(event) {
      console.log ('ENTER ASYNC!!!')
      //let startdate = '2022-01-02'
      //let enddate = '2022-01-03'
      let startdate = event[0]
      let enddate = event[1]
      let locations = []
      const resp = await elasticQueryDate('ais_v7', startdate, enddate)
      let i = 0;
      resp.data.hits.hits.map( (record) => {
        console.log ('SETTING LOCATIONS')
        locations.push({
          id: i,
          latlng: latLng(record._source.data.Latitude, record._source.data.Longitude),
          text: 'Vessel Name:' + record._source.data.VesselName +'\n Call Sign: '   + record._source.data.CallSign
            + '\n Vessel Type: ' + record._source.data.VesselType
        })
        i++
        //console.log(record._source.data.Latitude + record._source.data.Longitude + record._source.data.VesselName)
      });
      console.log('FINISH ASYNC!!')
      this.mapdata = this.locations;
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
      height: 100%;
    margin: 0;
}
  html, body {
    height: 100%;
    margin: 0;
  }
</style>
