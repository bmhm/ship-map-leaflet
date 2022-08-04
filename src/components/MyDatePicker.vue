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

  export default {
    name: "DatesChange",
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: 'This month',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()]);
              //console.log('CLICKING THIS MONTH: ' + toString(this.value2));
            }
          }, {
            text: 'This year',
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit('pick', [start, end]);
              //console.log('CLICKING THIS YEAR: ', this.value2);
            }
          }, {
            text: 'Last 6 months',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit('pick', [start, end]);
              //console.log('CLICKING LAST 6 MONTHS: ' + toString(this.value2));
            }
          }]
        },
        value1: '',
        value2: '',
        
      };
    },
    methods: {
      fireEventToParent() {
        this.$emit('CustomEventDatesChanged', [this.value1, this.value2]);
        console.log('EMITTING DATES TO APP')
      }
    }
  };
</script>