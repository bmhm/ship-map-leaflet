<template>
  <div id="app">
    <a href="#latest">Latest Data</a> |
    <a href="#month">Last Months Data</a> |
    <a href="#picker">Historical Data</a>
    <my-time-picker v-if="this.currentPath.slice(1) === 'picker'" @CustomEventDatesChanged="pullElastic($event)"></my-time-picker>
    <component :is="currentView"/>
    <my-map v-bind:mapdata="mapdata"></my-map>
    <img src="./assets/niwc.png"/>
  </div>
</template>

<script>
import MyMap from './components/MyMap.vue'
//import NavBar from './components/NavBar.vue'
import LatestData from './latest.vue'
import LastMonth from './lastmonths.vue'
//import HistoricalData from './HistoricalData.vue';

import MyTimePicker from './components/MyDatePicker.vue'
import elasticQueryDate from './components/elastic_date.js';
import { latLng} from 'leaflet';


const routes = {
  'latest': LatestData,
  'month': LastMonth,
}
export default {
  name: 'App',
  components: {
    'my-map': MyMap,
    //'nav-bar': NavBar,
    'my-time-picker':MyTimePicker
  },
  data(){
    return{
      mapdata: [],
      currentPath: window.location.hash
    }
  },
  methods: {
     async pullElastic(event) {
      console.log ('ENTER ASYNC!!! IN APP.VUE')
      let startdate = event[0]
      let enddate = event[1]
      const resp = await elasticQueryDate('ais_v7', startdate, enddate)
      let i = 0;
      resp.data.hits.hits.map( (record) => {
        console.log ('SETTING LOCATIONS')
        this.mapdata.push({
          id: i,
          latlng: latLng(record._source.data.Latitude, record._source.data.Longitude),
          text: 'Vessel Name:' + record._source.data.VesselName +'\n Call Sign: '   + record._source.data.CallSign
            + '\n Vessel Type: ' + record._source.data.VesselType
        })
        i++
        //console.log(record._source.data.Latitude + record._source.data.Longitude)
      });
      console.log('FINISH ASYNC!!')
    }
  },
  computed: {
    currentView(){
      return routes[this.currentPath.slice(1) || 'latest'] || 'latest'
    }
  },
  mounted(){
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
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
  img{
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>
