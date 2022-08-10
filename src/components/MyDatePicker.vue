<template>
  <div class="block">
    <span class="demonstration">Please Pick Dates</span>
    <el-date-picker
      v-model="value1"
      type="monthrange"
      range-separator="To"
      start-placeholder="Start month"
      end-placeholder="End month"
      @change = "fireEventToParent">
    </el-date-picker>
  </div>
</template>

<script>

import moment from 'moment'


  export default {
    name: 'MyTimePicker',
    data() {
      return {
        value1: '',
        value2: '',
        
      };
    },
    methods: {
      fireEventToParent() {
        let start = moment(String(this.value1[0])).format('YYYY-MM-DD');
        let end = moment(String(this.value1[1])).format('YYYY-MM-DD');
        console.log('dates to emit- date1 = ' + start + 'date2 = ' + end);
        this.$emit('CustomEventDatesChanged', [start, end]);
        console.log('EMITTING DATES TO APP')
      }
    }
  };
</script>