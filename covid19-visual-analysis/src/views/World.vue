<template>
  <el-container direction="vertical">
    <!-- 本页面第一部分：全球热力图&新闻播报 -->
    <el-container style="height: 700px">

      <el-container style="width:25%;" direction="vertical">
        <dv-border-box-8 style="width: 400px; height: 180px; margin-left: 50px; margin-bottom: 50px; padding-left: 10px">
        <h3>全球累计确诊：100</h3>
        <h3>全球现存确诊：100</h3>
        <h3>全球累计死亡：100</h3>
        </dv-border-box-8>

        <dv-border-box-1 style="width:400px;height: 300px; margin-left: 50px; margin-bottom: 30px">
          <div v-if="curCountry.countryName != ''" style="margin-left: 50px">
            <h2 style="color: #96dee8;">{{curCountry.countryName}}</h2>
            <h3>现有确诊：{{curCountry.curNum}}</h3>
            <h3>累计确诊：{{curCountry.tolNum}}</h3>
            <h3>累计治愈：{{curCountry.cureNum}}</h3>
          </div>
          <div v-else style="padding-top: 120px; width: 100%"><dv-decoration-3 style="width:100%;height:50px;" /></div>
        </dv-border-box-1>

        <h3 style="; color: #96dee8; margin-left: 190px">治愈率</h3>

        <dv-decoration-9 style="width:150px; height:150px; margin-left: 150px">
          <dv-decoration-6 v-if="curCountry.countryName == ''" style="width: 50px; height: 50px; position: relative; left: 0%"/>
          <span v-else style="font-family: zcool; color: #96dee8; font-size: 24px">60%</span>
        </dv-decoration-9>
      </el-container>

     <!-- 中间：3D地球 -->
      <el-container
        class="earthmap"
        id="chart_example6"
        style="width:800px;height:700px; ">
      </el-container>

      <!-- 右边：新闻 -->
      <div class="container">
        <span class="newstitle">实时播报</span>
        <div v-for="(item,index) in list" :key="index">
          <div class="newsList" v-for="(onenew,index) in item.news" :key="index">
            <div class="dateList">
              <div style="text-align: center; font-size: 14px;">{{onenew.pubDateStr}}</div>
              <div style="text-align: center; font-size: 12px;">{{onenew.pubDate|dateForm}}</div>
              <span class="dateItem"></span>
            </div>
            <div class="newsRight">
              <div class="newsItemTitle">
                <span class="newest" v-show="index==0">最新</span>
                {{onenew.title}}
              </div>
              <a :href="onenew.sourceUrl" target="__blank" style="font-size: 12px;">{{onenew.summary}}</a>
              <div style="text-align: right; font-size: 14px;">信息来源：{{onenew.infoSource}}</div>
            </div>
          </div>
        </div>
      </div>

    </el-container>

    <dv-decoration-10 style="width:96%;height:5px;margin-top:50px;" />

    <!-- 这是页面的第二部分：全球top10国家展示 -->
    <el-container class="top_chart">
    <el-container>
      <!-- 左边：表格展示 -->
      <el-container class="table-wrapper" style="width: 50%; margin-top:20px; margin-left: 10px;">
        <el-table
            :data="countryInfo"
            @row-click="handleRowClick"
            size="mini"
          >
            <el-table-column prop="name" label="国家" >
            </el-table-column>
            <el-table-column prop="curConfirmed" label="现有确诊" sortable>
            </el-table-column>
            <el-table-column prop="totConfirmed" label="累计确诊" sortable>
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
      <el-container style="width: 50%; height: 600px;  float: right; margin-left: 80px; margin-top: 20px">
        <dv-border-box-12 style="width: 900px" id="top10Chart">           
        </dv-border-box-12>
      </el-container>
    </el-container>
    </el-container>
    

  </el-container>
</template>

<script>
import {earthBaseTexture} from '../assets/earthBaseTexture.js'
import {nameMap} from '../assets/world.json'
import {dataArr} from '../assets/world.json'
import axios from 'axios'
import moment from 'moment'
import predictData from '../../public/predict.json'
export default {
  data() {
    return {
      totalNum: 1000,
      
      curCountry:{          /// 鼠标悬浮时选中的国家
        countryName: '',    /// 国家名称
        curNum: 0,          /// 现有确诊
        tolNum: 0,          /// 累计确诊
        cureNum: 0,         /// 累计治愈
      },
     //每个省的现况
      countryInfo:[
        {
          name: 'America',
          curConfirmed: '111',
          totConfirmed: '3223',
          curedCount: '2200',
          deadCount: '23',
          curedPercent: '98%',
          deadPercent: '2%',
        }, {
          name: 'China',
          curConfirmed: '121',
          totConfirmed: '2223',
          curedCount: '2200',
          deadCount: '23',
          curedPercent: '98%',
          deadPercent: '2%',
        }, 
      ],
      top10Data: {
        
      },
      selectedCountry: '',

      //新闻数据
      list: Array
    }
  },
  mounted() {
    this.initData()
    this.getNews()
    this.getPredict()
  },
  methods: {
    handleRowClick(row) {
      // console.log(row)
      this.selectedCountry = row.name
      this.drawCountry()
    },
    drawCountry() {
      var top10 =[];
      var dateSequence = [];
       var totalInfected = [];
       var totalCured = [];
      if(this.selectedCountry == 'America')
      {      
        // var top10 = ['美国1','美国2','美国3','美国4','美国5','美国6','美国7','美国8','美国9','美国10']  /// 这个数据是请求的
        dateSequence = ['2021-1','2021-2','2021-3','2021-4','2021-5','2021-6','2021-7','2021-8','2021-9','2021-10',]
        totalInfected = [100, 200, 300, 400, 450, 550, 600, 700, 750, 800]
        totalCured    = [50, 61, 71, 78, 89, 99,120,168,189,199]
      }
      if(this.selectedCountry == 'China')
      {
        dateSequence = ['2021-1','2021-2','2021-3','2021-4','2021-5','2021-6','2021-7','2021-8','2021-9','2021-10',]
        totalInfected = [100, 150, 302, 988, 43, 45320, 5430, 50, 50, 800]
        totalCured    = [50, 567, 671, 678, 812439, 949,1240,1648,1489,1499]
      }

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
            data: totalInfected
          },
          {
            name: 'toltalCured',
            type: 'bar',
            data: totalCured
          },
          {
            name: 'toltalInfected',
            type: 'line',
            yAxisIndex: 1,
            data: totalInfected
          }
        ]
      };
      top10Chart.setOption(top10Option)
    },
    // 绘制图表
    initData() {
      let self = this
     	let _nameMap_ = nameMap
      let _dataArr_ = dataArr
      //初始化canvas节点
      let myChart = this.$echarts.init(document.getElementById('chart_example6'),'walden')
      
      // 使用 echarts 绘制世界地图的实例作为纹理
      var canvas = document.createElement('canvas');
      var mapChart = this.$echarts.init(canvas, null, {
          width: 4096, height: 2048
      });
      mapChart.setOption({
          backgroundColor: 'rgba(23, 75, 110, 0.5)',
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
            min: 0,
            max: 10000,
            text:['max','min'],
            realtime: false,
            calculable: true,
            color: ['#f73f11','#e6a939'],
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
                borderWidth: 0.5, // 描边线宽 为 0 时无描边
                borderColor: '#000', // 图形的描边颜色 支持的颜色格式同 color，不支持回调函数
                borderType: 'solid', // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
               
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
                  borderColor: 'rgb(40, 120, 173)'
                }
              },
              // 自定义地区的名称映射
              nameMap: _nameMap_,
              // 地图系列中的数据内容数组 数组项可以为单个数值
              data: _dataArr_
            }
          ]
      });
      mapChart.on('mouseover', function(params){
        console.log(params.data.name)  //这里的params是鼠标悬浮的图表节点的数据
        self.curCountry.countryName = params.data.name
        /// 下面是瞎写的
        self.curCountry.curNum      = params.data.value
        self.curCountry.tolNum      = params.data.value * 1.5
        self.curCountry.cureNum     = params.data.value - 1
      })
            
      //echarts配置
      let option = {
        // backgroundColor: '#013954',
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
              color: '#fff', // 光照颜色
              intensity: 1, // 光照强度
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
        series: [
          {
            name: 'lines3D',
            type: 'lines3D',
            coordinateSystem: 'globe',
            effect: {
              show: true
            },
            blendMode: 'lighter',
            lineStyle: {
              width: 2
            },
            data: [],
            silent: false
          }
        ]
      }
      // 随机数据 i控制线数量
      // var chartDom = document.getElementById('top10Chart');
      var top10Chart = this.$echarts.init(document.getElementById('top10Chart'),'walden');
      var top10Option;
      top10Option = {
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
          data: ['Evaporation', 'Precipitation', 'Temperature']
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Precipitation',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: 'Temperature',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: 'Evaporation',
            type: 'bar',
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ]
          },
          {
            name: 'Precipitation',
            type: 'bar',
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ]
          },
          {
            name: 'Temperature',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      };
      top10Chart.setOption(top10Option)
      //画图
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    //获取新闻数据
    getNews () {
      axios({
        url: 'http://api.tianapi.com/ncov/index',
        method: 'get',
        params:{
          key: '2f3865d193ed10d014d38fd729aa172a'
        }
      })
      .then(res => {
        this.list=res.data.newslist
        console.log(this.list)
      })
    },
    //获取预测数据
    getPredict(){
      this.predict=predictData.predictData
    }
  },
  //转换时间戳
  filters:{
    dateForm:function (el) {
      return moment(el).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  watch: {},
  created() {}
}
</script>

<style lang="less" scoped>

.el-button {
  background: transparent;
  color: rgb(255, 255, 255);
  font-weight: 1000;

}

.el-button:hover {
  color:rgb(54, 173, 209)
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

h {
  color: rgb(23, 75, 110)
  #000c2d
  #f73f11,
  #f5610b,
  #ec510a
  #eb723b
    #f57032,
  #f5a30b,
  #ecc20a
  #ebda3b
    #d9db6b
  #2cf503
}

a {
  text-decoration: none;
  color: white;
}
.container {
  width: 25%;
  height: calc(100% - 60px);
  position: fixed;
  top: 80px;
  bottom: 0;
  right: 0;
  background: #152c4c99;
  color: white;
  z-index: 1;
  overflow-y: auto;
}
.newstitle {
  display: inline-block;
  width: 100%;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  padding-left: 20px;
}
.newsList {
  position: relative;
  display: flex;
}
.dateList {
  width: 30%;
  flex: none;
  transform: translateY(0.08rem);
  border-right: 1px solid #ebebeb;
}
.dateItem {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: wheat;
  position: absolute;
  right: -5px;
  top: -2px;
  border-radius: 50%;
}
.newsItemTitle {
  font-weight: bold;
  font-size: 14px;
}
.newsRight {
  width: 70%;
  padding-left: 10px;
  padding-bottom: 20px;
  padding-right: 10px;
}
.newest {
  display: inline-block;
  width: 30px;
  height: 20px;
  background: red;
  text-align: center;
  border-radius: 2px;
  line-height: 20px;
}

/* 滚动条样式开始 */
/* ----chrome---- */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

/* ----chrome---- */
/* ----firefox---- */
* {
  scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1);
  scrollbar-width: thin;
}

/* ----firefox---- */
/* edge、ie暂未找到解决方案，或者可以使用js库来进行优化 */
/* 滚动条样式结束 */
</style>