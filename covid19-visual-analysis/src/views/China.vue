<template>
<div>
    <el-container style="position:relative;left:420px;">
    <dv-decoration-11 style="width:220px;height:50px;">
            <el-button type="text" class="info_text" @click="drawCurData" style="font-size:22px" >现有确诊</el-button></dv-decoration-11>
    <dv-decoration-11 style="width:220px;height:50px;">
            <el-button type="text" class="info_text" @click="drawTotData" style="font-size:22px" >累计确诊</el-button></dv-decoration-11>
  </el-container>
  <el-container>
  <dv-decoration-12  style="width:330px;height:330px;margin-left:18px;">
    <h1 class="text_headline" style="color: #00efff;">现有确诊<br> {{this.cur_confi}} <br><br> 累计确诊<br> {{this.tot_confi}}
  </h1></dv-decoration-12>  

  <div id="regionCharts" :style="{width: '80%', height: '600px'}"></div>
  </el-container>


<dv-decoration-10 style="width:96%;height:5px;margin:30px;" />

  <el-container style="height:100%; width:100%; ">    
    <dv-border-box-12 style="height:100%; width:49%;margin-left:8px;padding:20px">
      <div class="text">全国疫情实时数据</div>
      <div style="width:590px;height:450px" ref="cur_chart" class="chart"></div>
    </dv-border-box-12>

    <dv-border-box-12 style="height:100%; width:49%;margin-right:20px;margin-left:20px;padding:20px">
      <div class="text">全国疫情累计数据</div>
      <div style="width:590px;height:450px" ref="tot_chart" class="chart"></div>
    </dv-border-box-12>
  </el-container>


</div>
</template>

<script>
export default{
  data(){
    return {
      cur_confi:3150,//全国现有确诊数
      tot_confi:128245,//全国累计确诊数

      /////// 以下数据均需要后端获取 ///////
      provi_cur_confi:[],//各省份现有确诊
      provi_tot_confi:[],//各省份累计确诊

      time_point:[  
        "2021/9/11 12:00:00",
        "2021/10/14 12:00:00",
        "2021/11/17 12:00:00",
        "2021/11/22 12:00:00",
        "2021/12/04 12:00:00",
      ],//存储数据的时间节点
      nation_cur_confi:[
        2361,2580,2794,2878,2150
      ],//全国现有确诊的数量（按时间节点排成数组）
      nation_cur_susp:[
        361,580,794,878,150
      ],//全国现有疑似的数量（按时间节点排成数组）
      nation_tot_confi:[
        122678,123920,124999,125888,126777
      ],//全国累计确诊的数量（按时间节点排成数组）
      nation_tot_cured:[
        112678,113900,113999,115888,116000
      ],//全国累计治愈的数量（按时间节点排成数组）
      nation_tot_dead:[
        5000,5100,5200,5300,5500
      ],//全国累计死亡的数量（按时间节点排成数组）
    }
  },
  methods: {
  //初始化热力图配置
  drawMap () {
    this.provi_cur_confi = [
      {name: '北京', value: 200}, 
      {name: '四川', value: 800},
      {name: '广西', value: 400}, 
      {name: '内蒙古', value: 600},
      {name: '安徽', value: 500}, 
      {name: '云南', value: 300},
      {name: '广东', value: 600}, 
      {name: '黑龙江', value: 100},
      {name: '青海', value: 500}, 
      {name: '新疆', value: 300},
      {name: '西藏', value: 600},
      {name: '湖北', value: 300},
      {name: '河南', value: 600}, 
      {name: '湖南', value: 100},
    ] // 该数据是从服务器获取到的数据
    let option = {
      tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name;//自行定义formatter格式
          }
      },
      visualMap: {
          min: 0,
          max: 1000,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],//取值范围的文字
          inRange: {
            color: ['#ffffff','#009999']//取值范围的颜色
          },
          show: true//图注
        },
        geo: {
          map: 'china',
          roam: false,//不开启缩放和平移
          zoom: 1.23,//视角缩放比例
          label: {
          normal: {
              show: true,
              fontSize: '10',
              color: 'rgba(0,0,0,0.7)'
          }, emphasis: {
              textStyle: {
              color: '#fff'
              }
          }
        },
        itemStyle: {
          normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
          },
          emphasis: {
              areaColor: '#6be6c1',//鼠标选择区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
            {
            name: '信息量',
            type: 'map',
            geoIndex: 0,
            data: this.provi_cur_confi
            }
        ]
    }
    let mychart = this.$echarts.init(document.getElementById('regionCharts'))
    mychart.setOption(option)
    this.$nextTick(() => {
      mychart.resize() // 这里是为了解决，tab刷新的时候，图表不刷新的问题。
    })
    },
  //渲染热力图现有确诊数据
  drawCurData(){
    this.provi_cur_confi = [
      {name: '北京', value: 200}, 
      {name: '四川', value: 800},
      {name: '广西', value: 400}, 
      {name: '内蒙古', value: 600},
      {name: '安徽', value: 500}, 
      {name: '云南', value: 300},
      {name: '广东', value: 600}, 
      {name: '黑龙江', value: 100},
      {name: '青海', value: 500}, 
      {name: '新疆', value: 300},
      {name: '西藏', value: 600},
      {name: '湖北', value: 300},
      {name: '河南', value: 600}, 
      {name: '湖南', value: 100},
    ] // 该数据是从服务器获取到的数据
    let option = {
        series: [
            {
            name: '信息量',
            type: 'map',
            geoIndex: 0,
            data: this.provi_cur_confi
            }
        ]
    }
    let mychart = this.$echarts.init(document.getElementById('regionCharts'))
    mychart.setOption(option)
  },
  //渲染热力图累计确诊数据
  drawTotData(){
    this.provi_tot_confi = [
      {name: '北京', value: 1000}, 
      {name: '四川', value: 800},
      {name: '广西', value: 400}, 
      {name: '内蒙古', value: 600},
      {name: '安徽', value: 500}, 
      {name: '云南', value: 1000},
      {name: '广东', value: 600}, 
      {name: '黑龙江', value: 100},
      {name: '青海', value: 500}, 
      {name: '新疆', value: 500},
      {name: '西藏', value: 1000},
      {name: '湖北', value: 1000},
      {name: '河南', value: 900}, 
      {name: '湖南', value: 600},
      {name: '甘肃', value: 1000},
      {name: '陕西', value: 900}, 
      {name: '山西', value: 600},
      {name: '吉林', value: 1000},
      {name: '辽宁', value: 900}, 
      {name: '山东', value: 600},
    ] // 该数据是从服务器获取到的数据
    let option = {
        series: [
            {
            name: '信息量',
            type: 'map',
            geoIndex: 0,
            data: this.provi_tot_confi
            }
        ]
    }
    let mychart = this.$echarts.init(document.getElementById('regionCharts'))
    mychart.setOption(option)
  },

  drawChart(){
    let myChart0 = this.$echarts.init(this.$refs.cur_chart,'walden');
    let myChart1 = this.$echarts.init(this.$refs.tot_chart,'walden');

  　myChart0.setOption({
      tooltip: {
          trigger: 'axis',
          axisPointer: {
          type: 'cross'
          }
      },
      legend: {
          data: ['现存确诊', '现存疑似']
      },
      toolbox: {
          feature: {
          dataZoom: {
              yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          data: this.time_point,
          boundaryGap: false
      },
      yAxis: {
          type: 'value',
          scale: true,
          boundaryGap: [0, '100%']
      },
      dataZoom: [
          {
              type: 'inside',
              start: 0,
              end: 40
          },
          {
              start: 0,
              end: 40
          }
      ],
      series: [
        { 
          name:'现存确诊',
          data: this.nation_cur_confi,
          symbol: 'none',
          type: 'line',
        },
        { 
          name:'现存疑似',
          data: this.nation_cur_susp,
          symbol: 'none',
          type: 'line',
        }
      ]
      //结束
    });
　　myChart1.setOption({
    //图表开始
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross'
            }
        },
        legend: {
          data: ['累计确诊', '累计治愈','累计死亡']
        },
        toolbox: {
            feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: this.time_point,
            boundaryGap: false
        },
        yAxis: {
            type: 'value',       
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 40
            },
            {
                start: 0,
                end: 40
            }
        ],
        series: [
          { 
            name:'累计确诊',
            data: this.nation_tot_confi,
            symbol: 'none',
            type: 'line',
          },
          {
            name:'累计治愈',
            data: this.nation_tot_cured,
            symbol: 'none',
            type: 'line',
          },
          {
            name:'累计死亡',
            data: this.nation_tot_dead,
            symbol: 'none',
            type: 'line',
          }
          
        ]
        //结束
    　　});
　　

  }


  },
  mounted(){
    this.drawMap() // 在页面进入的时候，先请求后端数据再调用这个函数，但由于我这里是写死的假数据，于是就直接调用了
    this.drawChart()
  },
}

</script>

<style lang="less" scoped>
.text{
  color: #96dee8;
  font-family: 'zcool';
  font-size: 25px;
  margin-bottom: 10px;
  text-align: center;
}
</style>