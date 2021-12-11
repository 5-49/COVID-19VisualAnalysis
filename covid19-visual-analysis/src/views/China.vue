<template>
<div>
  <!-- 切换热力图按钮 -->
    <el-container style="position:relative;left:420px;">
    <dv-decoration-11 style="width:220px;height:50px;">
            <el-button type="text" class="info_text" @click="drawCNCurData" style="font-size:22px" >现有确诊</el-button></dv-decoration-11>
    <dv-decoration-11 style="width:220px;height:50px;">
            <el-button type="text" class="info_text" @click="drawCNTotData" style="font-size:22px" >累计确诊</el-button></dv-decoration-11>
  </el-container>

 
  <el-container>
    <!-- 两个重要数据展示 -->
    <el-container direction="vertical">
      <dv-decoration-12  style="width:330px;height:330px;margin-left:18px;">
        <h1 class="text_headline" style="color: #00efff;  text-align: center;">
          现有确诊<br> {{this.cur_confi}} <br><br> 累计确诊<br> {{this.tot_confi}}
      </h1></dv-decoration-12>  

      <div class="text_headline" style="margin:30px 0px;margin-left:70px;">治愈率和死亡率</div>

      <!-- 水位图 -->
      <el-container style="">
        <dv-water-level-pond :config="cure_percent" style="width:150px;height:150px;margin-left:30px" />
        <dv-water-level-pond :config="dead_percent" style="width:150px;height:150px;margin-left:30px" />
      </el-container>
    </el-container>

    <!-- 热力图 -->
    <div id="CN_MapCharts" style="width:60%; height:600px;position:relative; left:-60px"></div>
  </el-container>

 <div class="d-flex jc-center">
      <div class="title">
        <dv-decoration-6
          class="dv-dec-6"
          :reverse="true"
          :color="['#3fb1e3', '#96dee8']"
          style="margin: 30px; position:relative; left:-30px"
        />
      </div>
    </div>
<!-- <dv-decoration-10 style="width:96%;height:5px;margin:30px;" /> -->
<el-container>
  <!-- 这是是新闻播报的左边 -->
  <el-container direction="vertical">
    <!-- 这是上面两个折线图 -->
    <el-container style="height:100%; width:100%; ">    
      <dv-border-box-12 style="height:100%; width:49%;margin-left:8px;padding:20px 0px 0px 20px">
        <div class="text">全国疫情实时数据</div>
        <div style="width:420px;height:400px" ref="cur_chart" class="chart"></div>
      </dv-border-box-12>

      <dv-border-box-12 style="height:100%; width:49%;margin-right:20px;margin-left:20px;padding:20px 0px 0px 20px">
        <div class="text">全国疫情累计数据</div>
        <div style="width:420px;height:400px" ref="tot_chart" class="chart"></div>
      </dv-border-box-12>
    </el-container>

    <dv-decoration-10 style="width:96%;height:5px;margin-top:50px;" />

    <!-- 这是下面省展示 -->
    <el-container>
      <!-- 这是表格 -->
      <div class="table-wrapper" style="width: 50%; margin-top:20px">
      <el-table
          :data="provinInfo"
          :cell-style="cellStyle"
          @row-click="handleRowClick"
          size="mini"
        >
          <el-table-column prop="Name" label="省名" >
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

        <!-- 这是省详细数据展示 -->
        <dv-border-box-1 style="width:48%; margin-top:20px; height:750px;">
          <div class="text_headline" style="position:relative; left:30px;top:20px">{{this.chosen_provi}}确诊情况</div>
          <!-- 热力图切换按钮 -->
          <el-container style="position:relative;left:40px;margin-top:30px">
            <dv-border-box-8 style="width:100px;height:40px;">
              <el-button type="text" class="info_text" @click="drawProvinCurData" style="font-size:20px;margin-left:10px" >
                现有确诊
              </el-button></dv-border-box-8>
            <dv-border-box-8 style="width:100px;height:40px;margin-left:30px">
              <el-button type="text" class="info_text" @click="drawProvinTotData" style="font-size:20px;margin-left:10px" >
                累计确诊
              </el-button></dv-border-box-8>
          </el-container>
          <!-- 热力图显示 -->
          <div id="provin_MapCharts" ref="provin_MapCharts" style="width:400px;height:350px;margin-left:50px;"></div>
          <div id="provin_BarCharts" ref="provin_BarCharts" style="width:450px;height:300px;margin-left:10px;"></div>

        </dv-border-box-1>
    </el-container>

  </el-container>

  <!-- 这下面是实时新闻播报 -->
  <div style="width: 25%"></div>



</el-container>

</div>
</template>

<script>
export default{
  
  data(){
    return {
      "cure_percent":{
        data: [93.1, 88],
        shape: 'roundRect',
        waveHeight:'10'
      },
      "dead_percent":{
        data: [4.4, 3],
        shape: 'roundRect',
        waveHeight:'10'
      },
      cur_confi:3150,//全国现有确诊数
      tot_confi:128245,//全国累计确诊数
      chosen_provi:'山西',

      /////// 以下数据均需要后端获取 ///////
      provi_cur_confi:[],//各省份现有确诊
      provi_tot_confi:[],//各省份累计确诊
      city_cur_confi:[],//各市区现有确诊
      city_tot_confi:[],//各市区累计确诊

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

      //每个省的现况
      provinInfo:[
        {
          Name: '山西',
          curConfirmed: '111',
          totConfirmed: '3223',
          curedCount: '2200',
          deadCount: '23',
          curedPercent: '98%',
          deadPercent: '2%',
        }, {
          Name: '浙江',
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
  methods: {
    cellStyle() {
      return "color:#96dee8";
    },
    handleRowClick(row){
      console.log(row.Name)
      this.chosen_provi = row.Name
      this.drawProviGraph()
    },
    //初始化全球热力图配置
    drawCNMap () {
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
          toolbox: {
          show: true,
          orient: 'vertical',
          x: 'right',
          y: 'center',
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: true},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
          series: [
            {
              name: '现存确诊',
              type: 'map',
              geoIndex: 0,
              data: this.provi_cur_confi
            }
          ]
      }
      let mychart = this.$echarts.init(document.getElementById('CN_MapCharts'))
      mychart.setOption(option)
    },
    //渲染热力图现有确诊数据
    drawCNCurData(){
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
      let mychart = this.$echarts.init(document.getElementById('CN_MapCharts'))
      mychart.setOption(option)
    },
    //渲染热力图累计确诊数据
    drawCNTotData(){
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
      let mychart = this.$echarts.init(document.getElementById('CN_MapCharts'))
      mychart.setOption(option)
    },
    //全国的两个折线图
    drawCNLine(){
      let myChart0 = this.$echarts.init(this.$refs.cur_chart,'walden');
      let myChart1 = this.$echarts.init(this.$refs.tot_chart,'walden');

    　myChart0.setOption({
      animationDuration: 10000,
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
      animationDuration: 10000,
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
    },
    //初始化每个省的热力图和柱状图
    drawProviGraph(){
      this.city_cur_confi=[
        {name: '太原市', value: 130},
        {name: '临汾市', value: 31},
        {name: '大同市', value: 55},
        {name: '运城市', value: 70},
      ]
      let map_option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
              return params.name;//自行定义formatter格式
            }
        },
        dataRange: {
          min: 0,
          max: 500,
          x: 'left',
          y: 'bottom',
          text: ['max', 'min'],
          inRange: {
              color: ['#ffffff','#009999']//取值范围的颜色
          },
          calculable: true
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          x: 'right',
          y: 'center',
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: true},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        roamController: {
          show: true,
          x: 'right',
          mapTypeControl: {
            'china': true
          }
        },
        series: [
          {
            name: '现存确诊',
            type: 'map',
            mapType: this.chosen_provi,
            roam: false,
            itemStyle: {
              normal: {label: {show: true}},
            },
            data: this.city_cur_confi
          },
        ]
      }
      let myMapchart = this.$echarts.init(document.getElementById('provin_MapCharts'))
      myMapchart.setOption(map_option)
      
      let bar_option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          show: true,
          left: 'right',
          top: 'center',
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {  //这是x轴文字颜色
                lineStyle: {
                    color: "#fff",
                }
            },
            data: this.city_cur_confi.map(function (item) {
            return item.name;
          })
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {  //这是x轴文字颜色
                lineStyle: {
                    color: "#fff",
                }
            }
          }
        ],
        series: [
          {
            name: '现存确诊',
            type: 'bar',
            data: this.city_cur_confi.map(function (item) {
            return item.value;
            }),
            itemStyle: {
              normal: {
                  color: function(params) {
                    //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                      var colorList = ['#ddffff','#96dee8','#00ffff','#3fb1e3','#6be6c1','#009999'];
                      return colorList[params.dataIndex]
                  }
              }
        }
          },
        ]
      };
      let myBarchart = this.$echarts.init(document.getElementById('provin_BarCharts'))
      myBarchart.setOption(bar_option)
    },
    //渲染省市热力图现有确诊数据
    drawProvinCurData(){
      this.city_cur_confi = [
        {name: '太原市', value: 130},
        {name: '临汾市', value: 31},
        {name: '大同市', value: 55},
        {name: '运城市', value: 70},
      ] // 该数据是从服务器获取到的数据
      let map_option = {
        series: [
          {
            name: '现存确诊',
            type: 'map',
            mapType: this.chosen_provi,
            roam: false,
            itemStyle: {
              normal: {label: {show: true}},
            },
            data: this.city_cur_confi
          }
        ]
      }
      let myMapchart = this.$echarts.init(document.getElementById('provin_MapCharts'))
      myMapchart.setOption(map_option)

      let bar_option = {
        series: [
          {
            name: '现存确诊',
            type: 'bar',
            data: this.city_cur_confi.map(function (item) {
            return item.value;
            })
          },
        ]
      };
      let myBarchart = this.$echarts.init(document.getElementById('provin_BarCharts'))
      myBarchart.setOption(bar_option)
    },
    //渲染省市热力图累计确诊数据
    drawProvinTotData(){
      this.city_tot_confi = [
        {name: '太原市', value: 430},
        {name: '临汾市', value: 361},
        {name: '大同市', value: 555},
        {name: '运城市', value: 700},
        {name: '长治市', value: 600},
      ] // 该数据是从服务器获取到的数据
      let map_option = {
        series: [
          {
            name: '现存确诊',
            type: 'map',
            mapType: this.chosen_provi,
            roam: false,
            itemStyle: {
              normal: {label: {show: true}},
            },
            data: this.city_tot_confi
          }
        ]
      }
      let myMapchart = this.$echarts.init(document.getElementById('provin_MapCharts'))
      myMapchart.setOption(map_option)

      let bar_option = {
        series: [
          {
            name: '累计确诊',
            type: 'bar',
            data: this.city_tot_confi.map(function (item) {
            return item.value;
            })
          },
        ]
      };
      let myBarchart = this.$echarts.init(document.getElementById('provin_BarCharts'))
      myBarchart.setOption(bar_option)
    },
  },
  mounted(){
    this.drawCNMap() // 在页面进入的时候，先请求后端数据再调用这个函数，但由于我这里是写死的假数据，于是就直接调用了
    this.drawCNLine()
    this.drawProviGraph()
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
.table-wrapper /deep/ .el-table--fit {
  padding-top: 3px;
  padding-left: 20px;
  padding-right: 20px;
}
.table-wrapper /deep/ .el-table,
.el-table__expanded-cell {
  background-color: #ffffff00;
}

.table-wrapper /deep/ .el-table tr {
  background-color: #10192418 !important;
}
.table-wrapper /deep/ .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: #0d1a2c18;
}
.el-container .el-table td,
.el-container .el-table th.is-leaf,
.el-container .el-table--border,
.el-container .el-table--group {
  border: none;
  cursor: pointer;
}
.el-container .el-table::before {
  height: 0;
}
</style>