<template>
  <div id="app">
    <a href="#latest">Latest Data</a> |
    <a href="#month">Last Months Data</a> |
    <a href="#picker">Historical Data</a>
    <component :is="currentView" />
  </div>
</template>

<script>
//import MyMap from './components/MyMap.vue'
//import NavBar from './components/NavBar.vue'
import LatestData from './latest.vue'
import LastMonth from './lastmonths.vue'
import HistoricalData from './HistoricalData.vue';

const routes = {
  'latest': LatestData,
  'month': LastMonth,
  'picker': HistoricalData
}

export default {
  name: 'App',
  components: {
    //'my-map': MyMap,
    //'nav-bar': NavBar,
  },


  data(){
    return{
      currentPath: window.location.hash
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
</style>
