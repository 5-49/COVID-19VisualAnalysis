import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import axios from 'axios'
import dataV from '@jiaminghi/data-view'
import VueParticles from 'vue-particles'
import './assets/css/font.css'
import './assets/css/global.css'
import './assets/theme'
import "./assets/date.less"

import 'echarts-gl';
import '../node_modules/echarts/map/js/world.js' // 引入世界地图
import '../node_modules/echarts/map/json/province/anhui.json' // 引入世界地图

import china from 'echarts/map/json/china.json' 
echarts.registerMap('china', china) 


// import zhejiang from 'echarts/map/json/zhejiang.json' 
// echarts.registerMap('zhejiang', zhejiang) 


Vue.config.productionTip = false
Vue.use(dataV)
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.use(VueParticles)
Vue.config.productionTip = false
Vue.prototype.$http=axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
