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
          <el-table-column prop="name" label="省名" >
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
const areaMap = {
    world: "globe",
    china: "china",
    "湖北省": "hubei",
    "北京市": "beijing",
    "天津市": "tianjin",
    "上海市": "shanghai",
    "重庆市": "chongqing",
    "黑龙江省": "heilongjiang",
    "吉林省": "jilin",
    "辽宁省": "liaoning",
    "河北省": "hebei",
    "山东省": "shandong",
    "河南省": "henan",
    "山西省": "shanxi",
    "陕西省": "shaanxi",
    "宁夏回族自治区": "ningxia",
    "内蒙古自治区": "neimenggu",
    "甘肃省": "gansu",
    "新疆维吾尔自治区": "xinjiang",
    "西藏自治区": "xizang",
    "江苏省": "jiangsu",
    "安徽省": "anhui",
    "四川省": "sichuan",
    "浙江省": "zhejiang",
    "江西省": "jiangxi",
    "湖南省": "hunan",
    "贵州省": "guizhou",
    "云南省": "yunnan",
    "广东省": "guangdong",
    "广西壮族自治区": "guangxi",
    "海南省": "hainan",
    "福建省": "fujian",
    "台湾省": "taiwan",
    "青海省": "qinghai",
    "香港特别行政区": "xianggang",
    "澳门特别行政区": "aomen",
}
export default{
  
  data(){
    return {
      "cure_percent":{
        data: [93.28, 88],
        shape: 'roundRect',
        waveHeight:'10'
      },
      "dead_percent":{
        data: [4.46, 3],
        shape: 'roundRect',
        waveHeight:'10'
      },
      cur_confi:2880,//全国现有确诊数
      tot_confi:127687,//全国累计确诊数
      chosen_provi:'山西',

      /////// 以下数据均需要后端获取 ///////
      provi_cur_confi:[],//各省份现有确诊
      provi_tot_confi:[],//各省份累计确诊
      city_cur_confi:[],//各市区现有确诊
      city_tot_confi:[],//各市区累计确诊

      CN_data:[{
        "time": "2021-11-27T01:24:14.000+00:00",
        "curConfirmed": 2865,
        "curSuspected": 0,
        "totConfirmed": 127672,
        "curedCount": 119110,
        "deadCount": 5697
      }],

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
          name: '山西',
          curConfirmed: '111',
          totConfirmed: '3223',
          curedCount: '2200',
          deadCount: '23',
          curedPercent: '98%',
          deadPercent: '2%',
        }, {
          name: '浙江',
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
      console.log(row.name)
      this.chosen_provi = row.name.substr(0, row.name.length - 1)
      console.log(this.chosen_provi)
      this.drawProviGraph()
    },
    //初始化全球热力图配置
    async drawCNMap () {
      //获取全国各省的现有确诊provi_cur_confi
      const { data: res } =await this.$http.
        get('/countryGeographyInformation/getNewestAllProvinceNowCountDate', 
        {params: 
          { beginTime:'2021-11-27 00:00:00',
            endTime:'2021-11-28 00:00:00' }
        }
      )
      console.log(res)
      this.provi_cur_confi = res.data
      console.log(this.provi_cur_confi)

      let option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
              return params.name;//自行定义formatter格式
            }
        },
        visualMap: {
            min: 0,
            max: 500,
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
    async drawCNCurData(){
      //获取全国各省的现有确诊provi_cur_confi
      const { data: res } =await this.$http.
        get('/countryGeographyInformation/getNewestAllProvinceNowCountDate', 
        {params: 
          { beginTime:'2021-11-27 00:00:00',
            endTime:'2021-11-28 00:00:00' }
        }
      )
      console.log(res)
      this.provi_cur_confi = res.data
      console.log(this.provi_cur_confi)

      let option = {
        visualMap: {
            min: 0,
            max: 500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],//取值范围的文字
            inRange: {
              color: ['#ffffff','#009999']//取值范围的颜色
            },
            show: true//图注
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
      let mychart = this.$echarts.init(document.getElementById('CN_MapCharts'))
      mychart.setOption(option)
    },
    //渲染热力图累计确诊数据
    async drawCNTotData(){
      //获取全国各省的累计确诊provi_tot_confi
      const { data: res } =await this.$http.
        get('/countryGeographyInformation/getNewestAllProvinceConfirmedDate', 
        {params: 
          { beginTime:'2020-1-27 00:00:00',
            endTime:'2021-11-28 00:00:00' }
        }
      )
      console.log(res)
      this.provi_tot_confi = res.data
      console.log(this.provi_tot_confi)

      let option = {
        visualMap: {
            min: 0,
            max: 4000,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],//取值范围的文字
            inRange: {
              color: ['#ffffff','#009999']//取值范围的颜色
            },
            show: true//图注
          },
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
    async drawCNLine(){
      //获取全国各省的累计确诊provi_tot_confi
      const { data: res } =await this.$http.
        get('/countryGeographyInformation/getChinaInformation', 
        {params: 
          { beginTime:'2021-9-27 00:00:00',
            endTime:'2021-11-28 00:00:00' }
        }
      )
      console.log(res)
      this.CN_data = res.data
      console.log(this.CN_data)

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
            data: this.CN_data.map(function (item) {
              return item.time;
            }),
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
            data: this.CN_data.map(function (item) {
              return item.curConfirmed;
            }),
            symbol: 'none',
            type: 'line',
          },
          { 
            name:'现存疑似',
            data: this.CN_data.map(function (item) {
              return item.curSuspected;
            }),
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
              data: this.CN_data.map(function (item) {
              return item.time;
            }),
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
              data: this.CN_data.map(function (item) {
              return item.totConfirmed;
            }),
              symbol: 'none',
              type: 'line',
            },
            {
              name:'累计治愈',
              data: this.CN_data.map(function (item) {
              return item.curedCount;
            }),
              symbol: 'none',
              type: 'line',
            },
            {
              name:'累计死亡',
              data: this.CN_data.map(function (item) {
              return item.deadCount;
            }),
              symbol: 'none',
              type: 'line',
            }
            
          ]
          //结束
      　　});
    },
    //初始化各省的table
    async initTable(){
      //获取全国各省的现有确诊provi_cur_confi
      const { data: res } =await this.$http.
        get('/countryGeographyInformation/getNewestAllProvinceDate', 
        {params: 
          { beginTime:'2021-11-27 00:00:00',
            endTime:'2021-11-28 00:00:00' }
        }
      )
      console.log(res)
      this.provinInfo = res.data
      console.log(this.provinInfo)
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
    this,this.initTable()
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