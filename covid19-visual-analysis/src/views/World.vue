<template>
  <div id='globe'>
    <div style="height: 700px">
     <div
      class="earthmap"
      id="chart_example6"
      style="width:700px;height:700px; float: left; margin-left: -100px">
    </div>
    <div style="width:500px;height:250px; float: right; margin-right: 550px; margin-bottom: 500px; margin-top: 150px">
      <dv-border-box-12 style="padding-left: 15px; padding-top: 25px; height: 100%">
        <div v-if="curCountry.countryName != ''">
          <h2 style="color: #96dee8;">{{curCountry.countryName}}</h2>
          <h3>现有确诊：{{curCountry.curNum}}</h3>
          <h3>累计确诊：{{curCountry.tolNum}}</h3>
          <h3>累计治愈：{{curCountry.cureNum}}</h3>
        </div>
        <div v-else style="padding-top: 100px; width: 100%"><dv-decoration-3 style="width:100%;height:50px;" /></div>
      </dv-border-box-12>
    </div>
    </div>
    <div class="top_chart">
      <el-divider></el-divider>
      <!-- 这是下面省展示 -->
    <el-container>
      <!-- 这是表格 -->
      <div class="table-wrapper" style="width: 100%; margin-top:20px; margin-left: 60px; float: left">
        <el-table
            :data="countryInfo"
            :cell-style="cellStyle"
            @row-click="handleRowClick"
            size="mini"
          >
            <el-table-column prop="Name" label="国家" >
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
      </div>

      <div style="width: 800px; height: 600px;  float: right; margin-left: 80px; margin-top: 20px">
        <dv-border-box-12 style="width: 800px">
            
        </dv-border-box-12>
      </div>
    </el-container>
    </div>
    

  </div>
</template>

<script>
import {earthBaseTexture} from '../assets/earthBaseTexture.js'
import {nameMap} from '../assets/world.json'
import {dataArr} from '../assets/world.json'
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
          Name: 'American',
          curConfirmed: '111',
          totConfirmed: '3223',
          curedCount: '2200',
          deadCount: '23',
          curedPercent: '98%',
          deadPercent: '2%',
        }, {
          Name: 'China',
          curConfirmed: '121',
          totConfirmed: '2223',
          curedCount: '2200',
          deadCount: '23',
          curedPercent: '98%',
          deadPercent: '2%',
        }, 
      ],

    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 绘制图表
    initData() {
      let self = this
     	let _nameMap_ = nameMap
      let _dataArr_ = dataArr
      //初始化canvas节点
      let myChart = this.$echarts.init(document.getElementById('chart_example6'))
      
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
        title: {
          text: '全球累计确诊人数: ' + this.totalNum,
          x: 'center',
          y: 0,
          textStyle: {
            color: '#96dee8',
            fontSize: 25,
            // font-family: 'zcool'
          }
        },
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
  font-family: zcool;
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
</style>