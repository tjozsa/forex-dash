import Vue from 'vue'
import App from './App.vue'

import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
stockInit(Highcharts)
// var Highcharts = require('highcharts/highstock');
require('highcharts/indicators/indicators')(Highcharts);
require('highcharts/indicators/rsi')(Highcharts);
require('highcharts/indicators/bollinger-bands')(Highcharts);

import HighchartsVue from 'highcharts-vue'
Vue.use(HighchartsVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
