<template>
  <div id='globe'>
     <div
      class="earthmap"
      id="chart_example6"
      style="width:800px;height:700px;"
    >
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
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 绘制图表
    initData() {
     	let _nameMap_ = nameMap
      let _dataArr_ = dataArr
      //初始化canvas节点
      let myChart = this.$echarts.init(document.getElementById('chart_example6'))
      //随机获取点点坐标函数
      let rodamData = function() {
        let name = '随机点' + Math.random().toFixed(5) * 100000
        // 终点经度
        let longitude = 105.18
        // 终点纬度
        let latitude = 37.51
        // 起点经度
        let longitude2 = Math.random() * 360 - 180
        // 起点纬度
        let latitude2 = Math.random() * 180 - 90
        return {
          coords: [
            [longitude2, latitude2],
            [longitude, latitude]
          ],
          value: (Math.random() * 3000).toFixed(2)
        }
      }
      // 使用 echarts 绘制世界地图的实例作为纹理
      var canvas = document.createElement('canvas');
      var mapChart = this.$echarts.init(canvas, null, {
          width: 4096, height: 2048
      });
      mapChart.setOption({
          backgroundColor: 'rgba(23, 75, 110, 0.5)',
          // series : [
          //     {
          //         type: 'map',
          //         map: 'world',
          //         // 绘制完整尺寸的 echarts 实例
          //         top: 0, left: 0,
          //         right: 0, bottom: 0,
          //         boundingCoords: [[-180, 90], [180, -90]]
          //     }
          // ],
          // // 视觉映射组件
          // visualMap: {
          //   min: 0,
          //   max: 10000,
          //   text:['max','min'],
          //   realtime: false,
          //   calculable: true,
          //   color: ['#0064d0','#c3e0ff'],
          // },
          // itemStyle: {
          //   borderColor: '#000d2d',
          //   normal: {
          //     areaColor: 'rgb(241, 233, 233)',
          //     borderColor: '#000c2d'
          //   },
          //   emphasis: {
          //     areaColor: 'rgb(241, 0, 233)'
          //   }
          // },
          // label: {
          //   fontSize: 25,
          // }
          // 图表主标题
          // title: {
          //   text: '世界地图', // 主标题文本，支持使用 \n 换行
          //   top: 10, // 定位 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
          //   left: 'center', // 值: 'left', 'center', 'right' 同上
          //   textStyle: { // 文本样式
          //     fontSize: 24,
          //     fontWeight: 600,
          //     color: '#000'
          //   }
          // },
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
            // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
            // 使用函数模板  传入的数据值 -> value: number | Array
            formatter: function (val) {
              if(val.data == null) return ;
              return val.data.name + ': ' + val.data.value
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
                show: false // 是否显示对应地名
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
    
      
      //echarts配置
      let option = {
        // backgroundColor: '#013954',
        backgroundColor: 'none',
        title: {
          text: '全球累计确诊人数: ' + this.totalNum,
          x: 'center',
          y: 0,
          textStyle: {
            color: '#fff',
            fontSize: 25
          }
        },
        tooltip: {
          trigger: 'item'
        },
        // legend: {
        //   orient: 'vertical',
        //   top: 'bottom',
        //   left: 'right',
        //   data: ['北京 Top10', '上海 Top10', '广州 Top10'],
        //   textStyle: {
        //     color: '#fff'
        //   },
        //   selectedMode: 'single'
        // },
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
            // targetCoord: [116.46, 39.92],
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
      for (let i = 0; i < 20; i++) {
        option.series[0].data = option.series[0].data.concat(rodamData())
      }
      //画图
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    }
  },
  watch: {},
  created() {}
}
</script>

<style lang="less" scoped>
// rgba(69, 128, 230, 0.8)
h {
  color: rgb(23, 75, 110)
  #000c2d
  #f73f11,
  #e6a939
}
</style>