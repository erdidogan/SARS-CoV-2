import App from './App.vue'
import Vue from 'vue'


import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy);

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
Vue.use(Chartkick);
Vue.use(Chartkick.use(Chart));
Chartkick.configure({language: "en", mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"})


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
