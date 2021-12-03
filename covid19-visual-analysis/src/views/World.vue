<template>
  <div id='globe'>
     <div
      class="earthmap"
      id="chart_example6"
      style="width:1670px;height:700px;"
    >
    </div>

  </div>
</template>

// <script>
// export default {
//   name: 'Echarts',
//   methods:{
// 	  myEcharts(){

//       /*
//       *图中相关城市经纬度,根据你的需求添加数据
//       *关于国家的经纬度，可以用首都的经纬度或者其他城市的经纬度
//       */
//       var geoCoordMap = {
//           '南宁': [108.479, 23.1152],
//           '广州': [113.5107, 23.2196],
//           '重庆': [107.7539, 30.1904],
//           '芬兰': [24.909912, 60.169095], 
//           '美国': [-100.696295, 33.679979], 
//           '日本': [139.710164, 35.706962], 
//           '韩国': [126.979208, 37.53875], 
//           '瑞士': [7.445147, 46.956241],
//           '东南亚': [117.53244, 5.300343], 
//           '澳大利亚': [135.193845, -25.304039], 
//           '德国': [13.402393, 52.518569], 
//           '英国': [-0.126608, 51.208425], 
//           '加拿大': [-102.646409, 59.994255]
//       };

//       /* 
//        *记录下起点城市和终点城市的名称，以及权重
//        *数组第一位为终点城市，数组第二位为起点城市，以及该城市的权重，就是图上圆圈的大小
//       */

//       var CQData = [
//           [{name: '重庆'}, {name: "英国",value: 70}]
//       ];

//       var GZData = [
//           [{name: '广州'}, {name: "日本",value: 30}],
//       ];

//       var NNData = [
//           [{name: '南宁'}, {name: "加拿大",value: 80}],
//           [{name: '南宁'}, {name: "美国",value: 100}],
//           [{name: '南宁'}, {name: "澳大利亚",value: 95}],
//           [{name: '南宁'}, {name: "瑞士",value: 50}]
//       ];

//       var convertData = function(data) {
//           var res = []; 
//           for(var i = 0; i < data.length; i++) {
//               var dataItem = data[i];
//               var fromCoord = geoCoordMap[dataItem[1].name];
//               var toCoord = geoCoordMap[dataItem[0].name];
//               if(fromCoord && toCoord) {
//                   res.push([fromCoord, toCoord])
//               }
//           }
//           console.log(res)
//           return res;
//       }

//       var series = [];// 3D飞线
//       var dser = [];  // 2D散点坐标
//       [['重庆', CQData],['广州', GZData],['南宁', NNData]].forEach(function(item, i) {
//           dser.push({ 
//           type: 'effectScatter',         
//           coordinateSystem: 'geo', 
//           zlevel: 3,
//           rippleEffect: {
//               brushType: 'stroke' 
//           },
//           label: {
//               fontSize:24,  
//               show: true,
//               position: 'right', 
//               formatter: '{b}'  
//           },
//           itemStyle: {
//               normal: {
//                   color: '#f5f802'
//               }
//           },
//           data: item[1].map(function(dataItem) {
//               return {
//                   name: dataItem[1].name,
//                   value: geoCoordMap[dataItem[1].name],
//                   symbolSize: dataItem[1].value / 4
//               };
//           })
//       },{
//           type: 'effectScatter',
//           coordinateSystem: 'geo',
//           zlevel: 3,
//           rippleEffect: {
//               brushType: 'stroke'
//           },
//           label: {
//               normal: {
//                   show: true,
//                   position: 'left',
//                   fontSize:18,
//                   formatter: '{b}'
//               }
//           },
//           itemStyle: {
//               normal: {
//                   color: '#ff0000'
//               }
//           },
//           data: [{
//               name: item[0],
//               value: geoCoordMap[item[0]],
//               symbolSize:parseInt(Math.random()*20+10),
//               label: {
//                   normal: {
//                       position: 'right'
//                   }
//               }
//           }]
//       })
//       series.push({
//               type: 'lines3D',
//               effect: {
//                   show: true,
//                   period: 3,//速度
//                   trailLength: 0.1//尾部阴影          
//               },
//               lineStyle: {//航线的视图效果
//                   color: '#9ae5fc',
//                   width: 1,
//                   opacity: 0.6
//               },
//               data: convertData(item[1])// 特效的起始、终点位置，一个二维数组，相当于coords: convertData(item[1])
//           })
//       });
//       var canvas = document.createElement('canvas');
   
//       var myChart = this.$echarts.init(canvas, null, {
//           width: 4096*2,
//           height: 4096
//       });
//       myChart.setOption({
//         backgroundColor: 'rgba(3,28,72,0.3)',
//         title: {
//             show:true
//         },
//         geo: {
//             type: 'map',
//             map: 'world',
//             left:0,
//             top:0,
//             right: 0,
//             bottom: 0,
//             boundingCoords: [[-180, 90], [180, -90]],
//             zoom:2.2,
//             roam: false,
//             itemStyle: {
//                 borderColor:'#000d2d',
//                 normal: {
//                     areaColor: '#2455ad',
//                     borderColor:'#000c2d'
//                 },
//                 emphasis: {
//                     areaColor: '#357cf8' 
//                 }
//             },
//             label:{
//                 fontSize:24
//             }
//         },
//         series:dser
//       });
//       var option = {
//         backgroundColor: 'rgba(0,0,0,0)',//canvas的背景颜色
//         globe: {
//             baseTexture:myChart,
//             top: 'middle',
//             left: 'center',
//             displacementScale: 0,
//             environment:'none',
//             shading: 'color',
//             viewControl: {
//                 distance:240,
//                 autoRotate: true
//             }
//         },
//         series:series
//       };

//       this.$echarts.init(document.getElementById("container")).setOption(option, true);


//     }
    

//   },
//   mounted() {
//   	this.myEcharts();
//   }
// }
// </script>


<script>
import {earthBaseTexture} from '../assets/earthBaseTexture.js'
export default {
  data() {
    return {}
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 绘制图表
    initData() {
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
      // 使用世界地图生成地球皮肤
      let canvas = document.createElement('canvas')
      let myChart2 = this.$echarts.init(canvas, null, {
        width: 4096,
        height: 2048
      })
      myChart2.setOption({
        backgroundColor: 'rgba(3,28,72,0.8)',
        title: {
          show: true
        },
        geo: {
          type: 'map',
          map: 'world',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          boundingCoords: [
            [-180, 90],
            [180, -90]
          ],
          zoom: 0,
          roam: false,
          itemStyle: {
            borderColor: '#000d2d',
            normal: {
              areaColor: 'rgb(241, 233, 233)',
              borderColor: '#000c2d'
            },
            emphasis: {
              areaColor: 'rgb(241, 233, 233)'
            }
          },
          label: {
            fontSize: 24
          }
        },
        series: []
      })
      //echarts配置
      let option = {
        // backgroundColor: '#013954',
        backgroundColor: 'none',
        // title: {
        //   text: '3D地球攻击线',
        //   x: 'center',
        //   y: 100,
        //   textStyle: {
        //     color: '#fff',
        //     fontSize: 25
        //   }
        // },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          top: 'bottom',
          left: 'right',
          data: ['北京 Top10', '上海 Top10', '广州 Top10'],
          textStyle: {
            color: '#fff'
          },
          selectedMode: 'single'
        },
        globe: {
          baseTexture: earthBaseTexture, 
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
          // shading: 'lambert',
          light: {
            // 光照阴影
            main: {
              color: '#fff', // 光照颜色
              intensity: 1.2, // 光照强度
              // shadowQuality: 'high', //阴影亮度
              shadow: false, // 是否显示阴影
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

</style>