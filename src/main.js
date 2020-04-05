import App from './App.vue'
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'


import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))

Vue.use(Buefy);




Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
