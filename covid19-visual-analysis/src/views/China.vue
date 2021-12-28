<template>
<div>
  <!-- 切换热力图按钮 -->
    <el-container style="position:relative;left:420px;margin-left:50px;width:600px">
    <dv-decoration-11 style="width:220px;height:50px;">
            <el-button type="text" class="info_text" @click="drawCNCurData" style="font-size:22px" >现有确诊</el-button></dv-decoration-11>
    <dv-decoration-11 style="width:220px;height:50px;">
            <el-button type="text" class="info_text" @click="drawCNTotData" style="font-size:22px" >累计确诊</el-button></dv-decoration-11>
  </el-container>

  <el-container>
    <!-- 两个重要数据展示 -->
    <el-container direction="vertical" style="width:30%;margin-left:20px">
      <dv-decoration-12  style="width:270px;height:270px;margin-left:18px;margin-left:50px">
        <h1 class="text_headline" style="color: #00efff;  text-align: center;font-weight:normal">
          现有确诊<br> 
          <countTo :startVal='0' :endVal='2880' :duration='3000' separator="" class="num" style="font-weight:normal">
          </countTo>
          <br> 累计确诊<br> 
          <countTo :startVal='0' :endVal='127687' :duration='3000' separator="" class="num" style="font-weight:normal">
          </countTo>
      </h1></dv-decoration-12>  

      <div class="text_headline" style="margin:30px 0px;margin-left:70px;">治愈率和死亡率</div>

      <!-- 水位图 -->
      <el-container style="margin-left:30px">
        <dv-water-level-pond :config="cure_percent" style="width:100px;height:150px;margin-left:30px" />
        <dv-water-level-pond :config="dead_percent" style="width:100px;height:150px;margin-left:30px" />
      </el-container>
    </el-container>

    <!-- 热力图 -->
    <div id="CN_MapCharts" style="width:60%; height:500px;position:relative; left:-300px"></div>
  </el-container>

 <div class="d-flex jc-center" style="width:80%">
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
  <el-container direction="vertical">
    
    <!-- 这是上面两个折线图 -->
    <el-container style="height:470px; width:100%; ">    
      <dv-border-box-12 style="height:100%; width:49%;margin-left:8px;padding:20px 0px 0px 20px">
        <div class="text">全国疫情实时数据</div>
        <div style="width:520px;height:400px;margin-left:30px" ref="cur_chart" class="chart"></div>
      </dv-border-box-12>

      <dv-border-box-12 style="height:100%; width:47%;margin-right:30px;margin-left:20px;padding:20px 0px 0px 20px">
        <div class="text">全国疫情累计数据</div>
        <div style="width:520px;height:400px;margin-left:30px" ref="tot_chart" class="chart"></div>
      </dv-border-box-12>
    </el-container>

    <dv-decoration-10 style="width:96%;height:5px;margin-top:50px;" />

    <!-- 这是邮件发送框 -->
    <el-container style="margin-bottom:15px;margin-top:30px;">
      <div style="margin-top:5px;margin-bottom:5px;margin-left:35px;font-family:zcool;font-size:30px;color:#00ffff;width:25%"> 
          邮件订阅省疫情信息:
      </div>
      <el-input v-model="userEmail"  placeholder="请输入您的邮箱" style=" margin-right:30px;width:50%"></el-input>
      <el-button @click="send" round style="height:40px" class="el-button1">发送</el-button>
    </el-container>

    <!-- 这是下面省展示 -->
    <el-container>
      <!-- 这是表格 -->
      <div class="table-wrapper" style="width: 53%; margin-top:20px;height:750px;">
      <el-table
          :cell-style="cellStyle"
          @row-click="handleRowClick"
          size="mini"
          :show-header="true"
          :data="provinInfo"
          height="750"
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
        </el-table>
      </div>

        <!-- 这是省详细数据展示 -->
        <dv-border-box-1 style="width:43%; margin-top:20px; height:750px;">
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
          <div id="provin_MapCharts" ref="provin_MapCharts" style="width:600px;height:350px;margin-left:50px;"></div>
          <div id="provin_BarCharts" ref="provin_BarCharts" style="width:520px;height:300px;margin-left:10px;"></div>

        </dv-border-box-1>
    </el-container>

  </el-container>

 <!-- 这下面是实时新闻播报 -->
  <div style="width: 20%">
    <div class="news_container">
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
  </div>
</el-container>

</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import countTo from 'vue-count-to'
import predictData from '../../public/predict.json'

export default {
  components: {
    countTo
  },
  data(){
    return {
      pagesize: 8, //一页展示的表格项数
      currentPage: 1,
      total: 40, //表格总项数

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
      chosen_provi:'北京',

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

      //每个省的现况
      provinInfo:[
        {
          "name": '山西',
          "curConfirmed": '111',
          "totConfirmed": '3223',
          "curedCount": '2200',
          "deadCount": '23',
          "curedPercent": '98%',
          "deadPercent": '2%',
        }
      ],
      list: Array,
      predict: Array,             //预测数组

      emailInfo:"",
      userEmail:""

      
    }
  },
  methods: {
    cellStyle() {
      return "color:#96dee8";
    },
    //分页栏
    current_change: function (currentPage) {
      this.currentPage = currentPage;
    },
    handleRowClick(row){
      this.chosen_provi = row.name
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
            max: 200,
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
            max: 200,
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
      this.predict=predictData.predictData
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
      var dateSequence = []
      var totConfirmed = []
      var country_predict = []

      totConfirmed = this.CN_data.map(function (item) {
              return item.totConfirmed;
            })
      var i=0
      for (var item in totConfirmed){
        country_predict.push("-");
        if (i == totConfirmed.length-1){
          country_predict[i]=totConfirmed[i];
        }
        i=i+1;
      }
      for (var item in this.predict) {
        if (this.predict[item].name == "中国") {
          country_predict.push(parseInt(this.predict[item].data[0]));
          country_predict.push(parseInt(this.predict[item].data[1]));
          country_predict.push(parseInt(this.predict[item].data[2]));
          country_predict.push(parseInt(this.predict[item].data[3]));
          country_predict.push(parseInt(this.predict[item].data[4]));
          country_predict.push(parseInt(this.predict[item].data[5]));
          country_predict.push(parseInt(this.predict[item].data[6]));
        }
      }
      console.log(country_predict)
      dateSequence = this.CN_data.map(function (item) {
              return item.time;})
      dateSequence.push("2021-11-28T09:41:10.000+00:00")
      dateSequence.push("2021-11-29T09:41:10.000+00:00")
      dateSequence.push("2021-11-30T09:41:10.000+00:00")
      dateSequence.push("2021-12-01T09:41:10.000+00:00")
      dateSequence.push("2021-12-02T09:41:10.000+00:00")
      dateSequence.push("2021-12-03T09:41:10.000+00:00")
      dateSequence.push("2021-12-04T09:41:10.000+00:00")
      dateSequence.push("2021-12-05T09:41:10.000+00:00")
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
            data: ['累计确诊', '预测确诊','累计治愈','累计死亡']
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
              data: dateSequence,
              boundaryGap: false
          },
          yAxis: [
            {
              type: 'value',     
              boundaryGap: [0, '100%']
          }
          ],
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
              name:'预测确诊',
              data: country_predict,
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
          { beginTime:'2021-9-27 00:00:00',
            endTime:'2021-11-28 00:00:00' }
        }
      )
      console.log(res)
      this.provinInfo = res.data
      console.log(this.provinInfo)
    },
    //初始化每个省的热力图和柱状图
    async drawProviGraph(){ 
      //获取省内各城市的现有确诊city_cur_confi
      const { data: res } =await this.$http.
        get('/countryGeographyInformation/getNewestCityNowCount', 
        {params: 
          { beginTime:'2021-8-27 00:00:00',
            endTime:'2021-11-28 00:00:00',
            name: this.chosen_provi}
        }
      )
      console.log(res)
      this.city_cur_confi = res.data
      console.log(this.city_cur_confi)

      var i
      if(this.chosen_provi!='北京'&& this.chosen_provi!='天津' && this.chosen_provi!='上海'){
        for(i=0;i<this.city_cur_confi.length;i++){
          this.city_cur_confi[i].name=this.city_cur_confi[i].name+'市'
        }
      }

      var i_max=10
      for(i=0;i<this.city_cur_confi.length;i++){
        if(this.city_cur_confi[i].value < 0){
          this.city_cur_confi[i].value = 0
        }
        if(this.city_cur_confi[i].value > i_max && this.city_cur_confi[i].name!='境外输入市' && this.city_cur_confi[i].name!='境外输入'){
          i_max=this.city_cur_confi[i].value
        }
      }

      let map_option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
              return params.name;//自行定义formatter格式
            }
        },
        dataRange: {
          min: 0,
          max: i_max,
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
                      var colorList = [
                        '#ddffff',
                        '#96dee8',
                        '#00ffff',
                        '#3fb1e3',
                        '#6be6c1',
                        '#009999',
                        '#ddffff',
                        '#96dee8',
                        '#00ffff',
                        '#3fb1e3',
                        '#6be6c1',
                        '#009999',
                        '#ddffff',
                        '#96dee8',
                        '#00ffff',
                        '#3fb1e3',
                        '#6be6c1',
                        '#009999',
                        '#ddffff',
                        '#96dee8',
                        '#00ffff',
                        '#3fb1e3',
                        '#6be6c1',
                        '#009999',];
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
    async drawProvinCurData(){
      //获取省内各城市的现有确诊city_cur_confi
      const { data: res } =await this.$http.
        get('/countryGeographyInformation/getNewestCityNowCount', 
        {params: 
          { beginTime:'2021-8-27 00:00:00',
            endTime:'2021-11-28 00:00:00',
            name: this.chosen_provi}
        }
      )
      console.log(res)
      this.city_cur_confi = res.data
      console.log(this.city_cur_confi)

      var i
      if(this.chosen_provi!='北京' && this.chosen_provi!='天津' && this.chosen_provi!='上海'){
        for(i=0;i<this.city_cur_confi.length;i++){
          this.city_cur_confi[i].name=this.city_cur_confi[i].name+'市'
        }
      }

      var i_max=10
      for(i=0;i<this.city_cur_confi.length;i++){
        if(this.city_cur_confi[i].value < 0){
          this.city_cur_confi[i].value = 0
        }
        if(this.city_cur_confi[i].value > i_max && this.city_cur_confi[i].name!='境外输入市' && this.city_cur_confi[i].name!='境外输入'){
          i_max=this.city_cur_confi[i].value
        }
      }

      let map_option = {
        dataRange: {
          min: 0,
          max: i_max,
          x: 'left',
          y: 'bottom',
          text: ['max', 'min'],
          inRange: {
              color: ['#ffffff','#009999']//取值范围的颜色
          },
          calculable: true
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
    async drawProvinTotData(){
      //获取省内各城市的累计确诊city_tot_confi
      const { data: res } =await this.$http.
        get('/countryGeographyInformation/getNewestCityConfirmedCount', 
        {params: 
          { beginTime:'2021-8-27 00:00:00',
            endTime:'2021-11-28 00:00:00',
            name: this.chosen_provi
          }
        }
      )
      console.log(res)
      this.city_tot_confi = res.data
      console.log(this.city_tot_confi)

      var i
      if(this.chosen_provi!='北京' && this.chosen_provi!='天津' && this.chosen_provi!='上海'){
        for(i=0;i<this.city_tot_confi.length;i++){
          this.city_tot_confi[i].name=this.city_tot_confi[i].name+'市'
        }
      }

      var i_max=10
      for(i=0;i<this.city_tot_confi.length;i++){
        if(this.city_tot_confi[i].value < 0){
          this.city_tot_confi[i].value = 0
        }
        if(this.city_tot_confi[i].value > i_max&& this.city_tot_confi[i].name!='境外输入市' && this.city_tot_confi[i].name!='境外输入'){
          i_max=this.city_tot_confi[i].value
        }
      }
    
      let map_option = {
        dataRange: {
          min: 0,
          max: i_max,
          x: 'left',
          y: 'bottom',
          text: ['max', 'min'],
          inRange: {
              color: ['#ffffff','#009999']//取值范围的颜色
          },
          calculable: true
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
    async send(){
      //await this.$http.delete('/MQTT/disconnect')
      
      this.send1()
      //this.setTimeout(this.send2(),500);
      // this.$http.
      //   post('/MQTT/setSendEmail?email=eess6%40163.com&emailTopic=111', 
      // )
    },
    async send1(){
      // 开始向服务器请求
      // await this.$http.post('/MQTT/setSendEmail', 
      
      //     { 
      //       email:this.userEmail,
      //       emailTopic:'全国各省疫情现状' }
          
      // )

      await axios({
        url: '/MQTT/setSendEmail',
        method: 'post',
        params: {
          email:this.userEmail,
          emailTopic:'全国各省疫情现状'
        }
      })

      this.send2()
    },
    async send2(){
      // await this.$http.get('/MQTT/subscribe', 
      //   {params: 
      //     { topic:'全国各省疫情现状' }
      //   }
      // )

      await axios({
        url: '/MQTT/subscribe',
        method: 'get',
        params: {
          topic:'全国各省疫情现状'
        }
      })

      // 这下面是邮件内容的处理
      this.emailInfo="截止2021年11月27号，各省疫情情况如下：\n\n"
      var i
      for(i=0;i<this.provinInfo.length;i++){
        this.emailInfo = this.emailInfo + `${this.provinInfo[i].name}` + "现有确诊人数：" + `${this.provinInfo[i].curConfirmed}` 
        + "    累计确诊人数：" + `${this.provinInfo[i].totConfirmed}`+ '\n'
      }
      console.log(this.emailInfo)

      this.send3()
      //this.setTimeout(this.send3(),500);
    },
    async send3(){
      // await this.$http.post('/MQTT/sendTo', 
      //     { 
      //       //infomation:this.emailInfo,
      //       information:'111',
      //       topic:'全国各省疫情现状'          
      //   }
      // )

      await axios({
        url: '/MQTT/sendTo',
        method: 'post',
        params: {
          information:this.emailInfo,
          topic:'全国各省疫情现状' 
        }
      })

      this.$http.delete('/MQTT/disconnect')
    }
  },
  //转换时间戳
  filters:{
    dateForm:function (el) {
      return moment(el).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  mounted(){
    this.$http.delete('/MQTT/disconnect')
    this.initTable()
    this.drawCNMap()
    this.drawCNLine()
    this.drawProviGraph()
    this.getNews()
  },
  destroyed(){
    this.$http.delete('/MQTT/disconnect')
    this.$http.delete('/redis/deleteAll')
  }
}

</script>

<style lang="less" scoped>
.el-button1 {
  background: #6bc3e63f;
  color: #96fcdd;
  font-weight: 1000;
  border: 1px solid #96fcdd;
}
.el-button:hover {
  color:rgb(255, 255, 255)
}
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
a {
  text-decoration: none;
  color: white;
}
.news_container {
  width: 20%;
  height: calc(100% - 100px);
  position: fixed;
  top: 70px;
  bottom: 70px;
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
</style>