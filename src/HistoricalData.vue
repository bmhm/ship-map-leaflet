<template>
  <div id="picker">
    <my-map v-bind:mapdata="mapdata"></my-map>
    <my-time-picker @CustomEventDatesChanged="pullElastic($event)"></my-time-picker>
  </div>
</template>

<script>
import MyMap from './components/MyMap.vue'
//import NavBar from './components/NavBar.vue'
import MyTimePicker from './components/MyDatePicker.vue'
import elasticQueryDate from './components/elastic_date.js';
import { latLng} from 'leaflet';
export default {
  name: 'HistoricalData',
  components: {
    'my-map': MyMap,
    //'nav-bar': NavBar,
    'my-time-picker':MyTimePicker
  },
   methods: {
     async pullElastic(event) {
      console.log ('ENTER ASYNC!!!')
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
  data(){
    return{
      mapdata: []
    }
  }
}
</script>