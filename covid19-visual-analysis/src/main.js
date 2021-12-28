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
// import vueSeamlessScroll from 'vue-seamless-scroll' 
import 'echarts-gl';
import '../node_modules/echarts/map/js/world.js' // 引入世界地图
import '../node_modules/echarts/map/json/province/anhui.json' // 引入世界地图

import china from 'echarts/map/json/china.json' 
echarts.registerMap('china', china) 

//导入省份模块
import 'echarts/map/js/province/anhui'
import 'echarts/map/js/province/aomen'
import 'echarts/map/js/province/beijing'
import 'echarts/map/js/province/chongqing'
import 'echarts/map/js/province/fujian'
import 'echarts/map/js/province/gansu'
import 'echarts/map/js/province/guangdong'
import 'echarts/map/js/province/guangxi'
import 'echarts/map/js/province/guizhou'
import 'echarts/map/js/province/hainan'
import 'echarts/map/js/province/hebei'
import 'echarts/map/js/province/heilongjiang'
import 'echarts/map/js/province/henan'
import 'echarts/map/js/province/hubei'
import 'echarts/map/js/province/hunan'
import 'echarts/map/js/province/jiangsu'
import 'echarts/map/js/province/jiangxi'
import 'echarts/map/js/province/jilin'
import 'echarts/map/js/province/liaoning'
import 'echarts/map/js/province/neimenggu'
import 'echarts/map/js/province/ningxia'
import 'echarts/map/js/province/qinghai'
import 'echarts/map/js/province/shandong'
import 'echarts/map/js/province/shanghai'
import 'echarts/map/js/province/shanxi'
import 'echarts/map/js/province/shanxi1'
import 'echarts/map/js/province/sichuan'
import 'echarts/map/js/province/taiwan'
import 'echarts/map/js/province/tianjin'
import 'echarts/map/js/province/xianggang'
import 'echarts/map/js/province/xinjiang'
import 'echarts/map/js/province/xizang'
import 'echarts/map/js/province/yunnan'
import 'echarts/map/js/province/zhejiang'
import moment from 'moment'

import predictData from '../public/predict.json'

Vue.config.productionTip = false
Vue.use(dataV)
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.use(VueParticles)
Vue.config.productionTip = false
Vue.prototype.$http=axios
Vue.use(moment)
Vue.use(predictData)
// Vue.use(vueSeamlessScroll)
axios.defaults.baseURL = 'http://101.132.138.14:8082/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
