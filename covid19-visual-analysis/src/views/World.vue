<template>
  <el-container  direction="vertical" >
      <!-- 标题 -->
    <!-- <div align="center" style="margin-top:40px;margin-bottom:-10px">  <img src="@/assets/image/title1.png"  style="width:600px;" /></div>
  <div align="center" style="margin-bottom:-70px">  <img src="@/assets/image/title2.png"  style="width:450px;" /></div> -->
        <div align="center" style="margin-top:10px;font-family:zcool;font-size:50px;color:#00ffff"> 
          新型冠状病毒疫情
        </div>
        <div align="center" style="margin-top:5px;margin-bottom:-70px;font-family:zcool;font-size:40px;color:#00ffff"> 
          数据可视化
        </div>
        <dv-decoration-5 class="headline" :dur="3"  :color="['#3fb1e3', '#96dee8']" style="width:1000px; height:150px; margin:0 auto" />
     

  <el-container direction="vertical">
    <!-- 本页面第一部分：全球热力图 -->
    <el-container style="height: 500px">
      <el-container style="width:25%;" direction="vertical">

        <el-button @click="postNewData" style="width:200px;margin-left:120px" round>发布新数据
          <i class="el-icon-upload el-icon--right"></i></el-button>
        <div style="margin-left:30px;margin-top:0px">
          <dv-decoration-11 style="width:400px;height:100px;margin:50px 0px">
          <h3 style="font-size:22px">全球累计确诊：
            <countTo :startVal="0" :endVal="globalInfo.totConfirmed" :duration="1000" separator="" class="num" style="font-weight:normal">
          </countTo></h3></dv-decoration-11>
          <dv-decoration-11 style="width:400px;height:100px;margin:50px 0px">
          <h3 style="font-size:22px">全球现存确诊：
            <countTo :startVal="0" :endVal="globalInfo.curConfirmed" :duration="1000" separator="" class="num" style="font-weight:normal">
          </countTo></h3></dv-decoration-11>
          <dv-decoration-11 style="width:400px;height:100px;margin:50px 0px">
          <h3 style="font-size:22px">全球累计死亡：
            <countTo :startVal="0" :endVal="globalInfo.totDead" :duration="1000" separator="" class="num" style="font-weight:normal">
          </countTo></h3></dv-decoration-11>
        </div>
      </el-container>

     <!-- 中间：3D地球 -->
     <el-container style="width:50%;margin-left:10px;margin-top:-10px">
      <div
        class="earthmap"
        id="chart_example6"
        style="width:900px;height:700px; postion:relative; left:50px;top:-70px">
      </div>
     </el-container>

      <!-- 右边 -->
    <el-container direction="horizonal" style="width:37%;margin-left:10px">
      <dv-border-box-11 title="国家数据看板" :color="['#6be6c1', '#3fb1e3']" style="padding-left:60px;padding-top:80px;width:400px;height:450px">
            <div class="headline" style="margin-left:-50px">{{curCountry.countryName}}</div>
            <el-container>
              <el-container style="float: left; width: 35%" direction="vertical">
                  <h3>现有确诊：<div class="num" style="font-weight:normal">{{curCountry.curNum}}</div></h3>
                  <h3>累计确诊：<div class="num" style="font-weight:normal">{{curCountry.tolNum}}</div></h3>
                  <h3>累计治愈：<div class="num" style="font-weight:normal">{{curCountry.cureNum}}</div></h3>  
              </el-container>
              <el-container style="float: right; width: 65%; padding-top: 100px; ">
                <h3 style="margin-left: 10%;">
                  治愈率: 
                  <dv-percent-pond :config="config" style="width:300px; height:100px; transform: rotate(270deg); float: right;" />
                </h3>              
              </el-container>
            </el-container>
            
            
      </dv-border-box-11>

    </el-container>

    

    </el-container>

    <el-container style="margin-top:50px">
      <dv-decoration-3 style="width:40%;height:30px;" />
      <dv-decoration-7 class="headline" style="width:30%;height:30px;">  Top10国家分析  </dv-decoration-7>
      <dv-decoration-3 style="width:40%;height:30px;" />
  </el-container>

    <!-- 这是页面的第二部分：全球top10国家展示 -->
    <el-container class="top_chart">
    <el-container>
      <!-- 左边：表格展示 -->
      <el-container class="table-wrapper" style="width: 50%; margin-top:80px; margin-left: 40px;">
        <el-table
            :data="top10Country"
            @row-click="handleRowClick"
            :row-style="{height: '50px'}"
            size="mini"
            
          >
            <el-table-column prop="name" label="国家" >
            </el-table-column>
            <el-table-column prop="totConfirmed" label="累计确诊" sortable>
            </el-table-column>
            <el-table-column prop="curConfirmed" label="现有确诊" sortable>
            </el-table-column>
            <el-table-column prop="curedCount" label="治愈人数" sortable>
            </el-table-column>
            <el-table-column prop="deadCount" label="死亡人数" sortable>
            </el-table-column>
            <el-table-column prop="curedPercent" label="治愈率" sortable>
            </el-table-column>
            <el-table-column prop="deadPercent" label="病死率" sortable>
            </el-table-column>
        </el-table>
      </el-container>
      <!-- 右边：渲染具体图标 -->
      <el-container style="width: 50%; height: 600px;  float: right; margin-left: 100px; margin-top: 20px">
        <dv-border-box-12 style="width: 800px; margin-left: 0px; margin-top: 40px" id="top10Chart">           
        </dv-border-box-12>
      </el-container>


      <el-drawer
          :visible.sync="drawer"
          direction="rtl"
          :before-close="handleClose">
        <div align="center" style="margin-top:5px;margin-bottom:10px;font-family:zcool;font-size:40px;color:#00ffff"> 
          新增数据
        </div>
        <el-select v-model="updateInfo.name" placeholder="请选择国家" style="margin;left: 25%; margin-bottom: 10px">
          <el-option
            v-for="item in allCountrys"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select><br>
        <el-input v-model="updateInfo.newConfirmed" placeholder="新增确诊" style="margin-left: 25%; margin-bottom: 10px; width: 49%"></el-input><br>
        <el-input v-model="updateInfo.newDead"      placeholder="新增死亡" style="margin-left: 25%; margin-bottom: 10px; width: 49%"></el-input><br>
        <el-input v-model="updateInfo.newCured"     placeholder="新增治愈" style="margin-left: 25%; margin-bottom: 10px; width: 49%"></el-input><br>
        <el-button @click="confirmUpdate" style="margin-right: 25%; float:right">发布数据</el-button>
      </el-drawer>
    </el-container>
    </el-container>
  </el-container>
   </el-container>
</template>

<script>

import {nameMap} from '../assets/world.json'
import {dataArr} from '../assets/world.json'
import predictData from '../../public/predict.json'
import countTo from 'vue-count-to'

export default {
  components: {
    countTo
  },
  data() {
    return {
      totalNum: 1000,
      
      curCountry:{          /// 鼠标悬浮时选中的国家
        countryName: '美国',    /// 国家名称
        curNum: 8528066,          /// 现有确诊
        tolNum: 48090884,          /// 累计确诊
        cureNum: 38787459,         /// 累计治愈
        curedRate: '81.6%'       /// 治愈率
      },
      eachCountryInfo:[],                   /// 各个国家各种信息
      top10Country: [],
      selectedCountry: '',
      config: {                 /// dataV配置
        value: 98,
        localGradient: true
      },
      countryToDraw: {
        dateSequence: [],     /// 时间点序列
        totConfirmed: [],     /// 对应时间点的累计确诊
        totCured:     [],     /// 对应时间点的累计治愈
      },
      drawer: false,
      allCountrys: nameMap,     /// 所有国家的名字
      updateInfo: {
        name: '',           /// 需要更新数据的国家名称
        newConfirmed: '',    /// 新增确诊
        newDead: '',         /// 新增死亡
        newCured: ''         /// 新增治愈
      },
      globalInfo: {
        totConfirmed: 0,
        curConfirmed: 0,
        totDead: 0

      },
      predict: Array,             //预测数组
      dataList: [],

    }
  },
  computed: {
   
  },
  mounted() {
    this.getEachNationInfo()
    this.getGlobalInfo()
    console.log(this.allCountrys)
    
  },
  methods: {
    postNewData() {
      this.drawer = true

    },
    handleClose() {
      this.drawer = false
    },
    confirmUpdate() {
      console.log(this.updateInfo)
      this.globalInfo.totConfirmed += parseInt(this.updateInfo.newConfirmed)
      this.globalInfo.curConfirmed += parseInt(this.updateInfo.newConfirmed)
      this.globalInfo.totDead      += parseInt(this.updateInfo.newDead)

      var countryIndex = (this.allCountrys || []).findIndex(item => item.name === this.updateInfo.name)
      this.eachCountryInfo[countryIndex].curConfirmed += parseInt(this.updateInfo.newConfirmed)
      this.eachCountryInfo[countryIndex].totConfirmed += parseInt(this.updateInfo.newConfirmed)
      this.eachCountryInfo[countryIndex].totDead      += parseInt(this.updateInfo.newDead)
      this.eachCountryInfo[countryIndex].curedCount   += parseInt(this.updateInfo.newCured)
      this.initData()
      // this.dataList.push(this.updateInfo.name + ":\n新增确诊：" + this.updateInfo.newConfirmed + "\n新增死亡：" + this.updateInfo.newDead + "\n新增治愈：" + this.updateInfo.newCured)
      console.log(this.curCountry)
      this.curCountry.countryName = this.updateInfo.name
      this.curCountry.curNum      = this.eachCountryInfo[countryIndex].curConfirmed
      this.curCountry.tolNum      = this.eachCountryInfo[countryIndex].totConfirmed
      this.curCountry.cureNum     = this.eachCountryInfo[countryIndex].curedCount
      this.curCountry.curedRate   = this.eachCountryInfo[countryIndex].curedRate
      this.drawer = false
    },
    getGlobalInfo() {
      let self = this
      this.predict=predictData.predictData
      this.$http({
        method: 'get',
        url: 'http://101.132.138.14:8082/globalCountry/getGlobalInformationBySlot',
        params: {
          beginTime: '2021-01-24 17:00:00',
          dayCount: 31,
          endTime: '2021-11-24 17:00:00'
        }
      }).then(response => {
        console.log(response.data)
        console.log(response.data.data)
        var dateSequence = []
        var totConfirmed = []
        var totCured     = []
        dateSequence = response.data.data.map(item =>{ return item.updatedTime.slice(5, 10)})
        totConfirmed = response.data.data.map(item =>{ return item.totConfirmed})
        totCured = response.data.data.map(item =>{ return item.curedCount})
        var top10Chart = this.$echarts.init(document.getElementById('top10Chart'),'walden');
        var top10Option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            textStyle: {
              color: "#fff"
            },
            data: ['累计确诊','累计治愈','累计确诊趋势']
          },
          xAxis: [
            {
              type: 'category',
              data: dateSequence,
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '累计确诊',
              min: 0,
              max: 300000000,
              interval: 25000000,
              axisLabel: {
                formatter: '{value}'
              }
            },
            // {
            //   type: 'value',
            //   name: '累计治愈',
            //   min: 10000,
            //   max: 5000000,
            //   interval: 3000000,
            //   axisLabel: {
            //     formatter: '{value}'
            //   }
            // }
          ],
          series: [
            {
              name: '累计确诊',
              type: 'bar',
              data: totConfirmed
            },
            {
              name: '累计治愈',
              type: 'bar',
              data: totCured
            },
            {
              name: '累计确诊趋势',
              type: 'line',
              yAxisIndex: 0,
              data: totConfirmed
            }
          ]
        };
        top10Chart.setOption(top10Option)
      })
    },
    getEachNationInfo() {
      let self = this
      this.$http({
        method: 'get',
        url: 'http://101.132.138.14:8082/globalCountry/getAllCountryData',
        params: {
          beginTime: '2021-11-24 17:00:00',
          endTime: '2021-11-24 17:00:00'
        }
      }).then(response => {
        console.log(response.data.data)
        self.eachCountryInfo = response.data.data
        self.allCountrys = response.data.data.map(item => { return { name: item.name } })
        this.initData()
        for(var i = 0; i < 10; i++){
          self.top10Country.push(self.eachCountryInfo[i])
        }
        for(var i = 0; i < self.eachCountryInfo.length; i++){
          self.globalInfo.totConfirmed += self.eachCountryInfo[i].totConfirmed
          self.globalInfo.curConfirmed += self.eachCountryInfo[i].curConfirmed
          self.globalInfo.totDead      += self.eachCountryInfo[i].deadCount
        }
      })
    },
    handleRowClick(row) {
      console.log(row.id)
      this.predict=predictData.predictData
      this.$http({
        method: 'get',
        url: 'http://101.132.138.14:8082/globalCountry/getOneCountryInformationBySlot',
        params: {
          beginTime: '2021-01-24 17:00:00',
          countryId: row.id,
          dayCount: 30,
          endTime: '2021-11-24 17:00:00'

        }
      }).then(response => {
        console.log(response)
        var dateSequence = []
        var totConfirmed = []
        var totCured     = []
        var country_predict = 0
        for (var item in this.predict) {
          if (this.predict[item].name == row.name) {
            country_predict = this.predict[item].data[6];
          }
        }
        console.log(country_predict)
        dateSequence = response.data.data.map(item =>{ return item.updatedTime.slice(5, 10)})
        dateSequence.push("12-05")
        totConfirmed = response.data.data.map(item =>{ return item.totConfirmed})
        totCured = response.data.data.map(item =>{ return item.curedCount})
        var top10Chart = this.$echarts.init(document.getElementById('top10Chart'),'walden');
        var top10Option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            textStyle: {
              color: "#fff"
            },
            data: ['累计确诊','累计治愈', '预测确诊','累计确诊趋势','预测确诊趋势']
          },
          xAxis: [
            {
              type: 'category',
              data: dateSequence,
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '累计确诊',
              min: 0,
              max: 50000000,
              interval: 2500000,
              axisLabel: {
                formatter: '{value}'
              }
            },
            // {
            //   type: 'value',
            //   name: '累计治愈',
            //   min: 10000,
            //   max: 5000000,
            //   interval: 3000000,
            //   axisLabel: {
            //     formatter: '{value}'
            //   }
            // }
          ],
          series: [
            {
              name: '累计确诊',
              type: 'bar',
              data: totConfirmed
            },
            {
              name: '预测确诊',
              type: 'bar',
              data: [
                "-", "-", "-","-","-","-","-","-","-","-","-", parseInt(country_predict)
              ],
              itemStyle: {
                normal:{
                  color: "#ff7f50"
                }
              }
            },
            {
              name: '累计治愈',
              type: 'bar',
              data: totCured
            },
            {
              name: '累计确诊趋势',
              type: 'line',
              yAxisIndex: 0,
              data: totConfirmed
            },
            {
            name: '预测确诊趋势',
            type: 'line',
            smooth: false,
            yAxisIndex: 0,
            data: [
              "-", "-", "-","-","-","-","-","-","-","-",totConfirmed[10], parseInt(country_predict)
            ],
            itemStyle: {
              normal:{
                color: "#dcdcdc",
                lineStyle: {
                  type: 'dotted'
                }
              }
            }
          }
          ]
        };
        top10Chart.setOption(top10Option)
      })

      
    },
    drawCountry(dateSequence, totConfirmed, totCured) {
    
      var top10Chart = this.$echarts.init(document.getElementById('top10Chart'),'walden');
      var top10Option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: false, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: false },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            data: dateSequence,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '累计确诊',
            min: 0,
            max: 1000,
            interval: 100,
            axisLabel: {
              formatter: '{value}万'
            }
          },
          {
            type: 'value',
            name: '累计治愈',
            min: 0,
            max: 1000,
            interval: 100,
            axisLabel: {
              formatter: '{value}万'
            }
          }
        ],
        series: [
          {
            name: 'toltalInfected',
            type: 'bar',
            data: totConfirmed
          },
          {
            name: 'toltalCured',
            type: 'bar',
            data: totCured
          },
          {
            name: 'toltalInfected',
            type: 'line',
            yAxisIndex: 1,
            data: totConfirmed
          }
        ]
      };
      top10Chart.setOption(top10Option)
    },
    // 绘制图表
    initData() {
      
      let self = this
     	let _nameMap_ = nameMap
     
      //初始化canvas节点
      let myChart = this.$echarts.init(document.getElementById('chart_example6'),'walden')
      
      // 使用 echarts 绘制世界地图的实例作为纹理
      var canvas = document.createElement('canvas');
      var mapChart = this.$echarts.init(canvas, null, {
          width: 4096, height: 2048
      });
      mapChart.setOption({
          backgroundColor: 'rgba(26, 107, 161, 0.9)',
          grid: {
            width:'100%',
            height:'100%',
              left: '0%',
              right: '0%',
              bottom: '0%',
              containLabel: true
          },
          // 提示框组件
          tooltip: {
            trigger: 'item', // 触发类型, 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
            show: true,
            // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
            // 使用函数模板  传入的数据值 -> value: number | Array
            formatter: function (val) {
              if(val.data == null) return ;
              return val.name + ': ' + val.value
            }
          },
          // 视觉映射组件
          visualMap: {
            min: 20000,
            max: 4000000,
            text:['max','min'],
            realtime: false,
            calculable: true,
            color: ['#f73f11','#f3bd59'],
          },
          series: [
            {
              type: 'map', // 类型
              // 系列名称，用于tooltip的显示，legend 的图例筛选 在 setOption 更新数据和配置项时用于指定对应的系列
              name: '世界地图',
              mapType: 'world', // 地图类型
              // 是否开启鼠标缩放和平移漫游 默认不开启 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move' 设置成 true 为都开启
              roam: true,
              // 图形上的文本标签
              label: {
                show: true // 是否显示对应地名
              },
              zoom: 1.2,
              // 地图区域的多边形 图形样式
              itemStyle: {
                // areaColor: '#7B68EE', // 地图区域的颜色 如果设置了visualMap，areaColor属性将不起作用
                borderWidth: 1, // 描边线宽 为 0 时无描边
                borderColor: '#000', // 图形的描边颜色 支持的颜色格式同 color，不支持回调函数
                borderType: 'solid', // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
                //    borderWidth: 5,//设置外层边框
                // borderColor:'#9ffcff',
                // shadowColor: '#00b7ff',
                // shadowBlur: 10
               
              }, 
              label: {
                  fontSize: 25,
              },
              // 高亮状态下的多边形和标签样式
              emphasis: {
                label: {
                  show: true, // 是否显示标签
                  color: '#fff' // 文字的颜色 如果设置为 'auto'，则为视觉映射得到的颜色，如系列色
                },
                itemStyle: {
                  areaColor: '#FF6347', // 地图区域的颜色
                  borderWidth: 3,
                  borderColor: 'rgb(0, 0, 0)',
                  

                }
              },
              // 自定义地区的名称映射
              nameMap: _nameMap_,
              // 地图系列中的数据内容数组 数组项可以为单个数值
              data: this.eachCountryInfo.map(item => {
                return {
                  'name': item.name, 
                  'value': item.totConfirmed,
                  'curConfirmed': item.curConfirmed,
                  'curedCount': item.curedCount,
                  'curedRate': item.curedPercent,
                  'deadCount': item.deadCount
                }
              })
            }
          ]
      });
      
      mapChart.on('mouseover', function(params){
        // console.log(params.data.name)  //这里的params是鼠标悬浮的图表节点的数据
        
        try{
          const { config } = self

          console.log(params.data.curedRate)
          self.curCountry.countryName = params.data.name
          
          self.curCountry.curNum      = params.data.curConfirmed
          self.curCountry.tolNum      = params.data.value
          self.curCountry.cureNum     = params.data.curedCount
          self.curCountry.curedRate   = params.data.curedRate
          self.config.value           = parseFloat(self.curCountry.curedRate)
          console.log(self.config.value)
          self.config = { ...self.config }

        }catch{
          // self.curCountry.countryName = ''
          return
        }

      })
      var op = mapChart.getOption()
      console.log(op)
      //echarts 3D地球配置
      let option = {

        backgroundColor: 'none',
        tooltip: {
          trigger: 'item',
          "confine": true,
          "formatter": (p) => {
            return 'hello'
          }
        },
        
        globe: {
          baseTexture: mapChart, 
          environment: this.$echarts.graphic.LinearGradient(
            0,
            1,
            1,
            1,
            [
              {
                offset: 0,
                color: '#000000' // 天空颜色
              },
              {
                offset: 0,
                color: '#000000' // 地面颜色
              },
              {
                offset: 0,
                color: '#000000' // 地面颜色
              }
            ],
            true
          ),
          shading: 'color',
          light: {
            // 光照阴影
            main: {
              color: '#000', // 光照颜色
              intensity: 10, // 光照强度
              shadowQuality: 'high', //阴影亮度
              shadow: true, // 是否显示阴影
              alpha: 40,
              beta: -30
            },
            ambient: {
              intensity: 0.5
            }
          },
          viewControl: {
            alpha: 30,
            beta: 160,
            autoRotate: true,
            autoRotateAfterStill: 1,
            distance: 240
          }
        },
      }

      //画图
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
  },
  watch: {},
  created() {}
}
</script>

<style lang="less" scoped>

.el-button {
  background: #6bc3e63f;
  color: #96fcdd;
  font-weight: 1000;
  border: 1px solid #96fcdd;
}
.el-button:hover {
  color:rgb(255, 255, 255)
}

/deep/ .el-table {
  background-color: transparent !important;
  color: rgb(255, 255, 255)
}
/deep/ .el-table__row{
  background-color: transparent !important;
  color: rgb(255, 255, 255)
}

/deep/ .el-table th>.cell{
  background-color: transparent !important;
}

/deep/ .el-table .el-table__header-wrapper tr th{
  background-color: transparent !important;

}
/deep/ .el-table--enable-row-hover .el-table__body tr:hover>td{
    color: rgb(0, 0, 0)
}
h3 {
  // font-family: zcool;
  color: #96dee8;
}
/deep/ .el-input__inner{
  background-color: #5cceff75 !important;
  border: 0px solid #DCDFE6 !important;
  color: #ffffff !important;
}
.headline{
  color: #6be6c1;
  font-family: 'zcool';
  font-size: 50px;
  margin-bottom: 10px;
  text-align: center; 
  // color:#00b7ff
}
/deep/ .el-drawer {
    position: absolute;
    box-sizing: border-box;
    background-color: rgba(135, 199, 224, 0.466)!important;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 10px -5px rgb(0 0 0 / 20%), 0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%);
    outline: 0;
}

</style>