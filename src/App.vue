<template>
  <div id="app">
    <nav-bar />
    <my-time-picker />
    <my-map />
  </div>
</template>

<script>
import MyMap from './components/MyMap.vue'
import NavBar from './components/NavBar.vue'
import MyTimePicker from './components/MyDatePicker.vue'


export default {
  name: 'App',
  components: {
    'my-map': MyMap,
    'nav-bar': NavBar,
    'my-time-picker':MyTimePicker
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
