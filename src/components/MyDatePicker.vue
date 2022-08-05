<template>
<div>
  <div class="block">
    <span class="demonstration">Default</span>
    <el-date-picker
      v-model="value1"
      type="monthrange"
      range-separator="To"
      start-placeholder="Start month"
      end-placeholder="End month"
      @change = "fireEventToParent">
    </el-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">With quick options</span>
    <el-date-picker
      v-model="value2"
      type="monthrange"
      align="right"
      unlink-panels
      range-separator="To"
      start-placeholder="Start month"
      end-placeholder="End month"
      @change = "fireEventToParent"
      :picker-options="pickerOptions">
    </el-date-picker>
  </div>
</div>
</template>

<script>

import moment from 'moment'


  export default {
    name: "DatesChange",
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: 'This month',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()]);
            }
          }, {
            text: 'This year',
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Last 6 months',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
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