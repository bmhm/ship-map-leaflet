<template>
  <div id="app">
    <nav-bar />
    <my-time-picker />
    <my-map :mapdata="mapdata"></my-map>/>
    <DatesChange
      @CustomEventDatesChanged = "pullElastic($event)">
    </DatesChange>
  </div>
</template>

<script>
import MyMap from './components/MyMap.vue'
import NavBar from './components/NavBar.vue'
import MyTimePicker from './components/MyDatePicker.vue'

import elasticQueryDate from './components/elastic_date.js';
import DatesChange from './components/MyDatePicker.vue'
import { latLng} from 'leaflet'


export default {
  name: 'App',
  components: {
    'my-map': MyMap,
    'nav-bar': NavBar,
    'my-time-picker':MyTimePicker,
    DatesChange,
  },
  mounted() {
    //this.pullElastic();
  },
   methods: {
     async pullElastic(event) {
      console.log ('ENTER ASYNC!!!')
      //let startdate = '2022-01-02T00:00:00Z'
      //let enddate = '2022-01-02T00:00:02Z'
      //console.log('heres the dates ' + this.value1.start + ' ' + this.value2)
      let startdate = event.value1[0]
      let enddate = event.value1[0]
      const resp = await elasticQueryDate('ais_v7', startdate, enddate)
      let i = 0;
      let locations = [];
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
      this.mapdata = locations;
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
