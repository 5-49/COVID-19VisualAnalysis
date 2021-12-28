<template>
  <div>
    <div id="CN_MapCharts" style="width:800px; height:500px;"></div>
    <div class="container">
      <span class="newstitle">实时播报</span>
      <div v-for="(item,index) in list" :key="index">
        <div class="newsList" v-for="(onenew,index) in item.news" :key="index">
          <div class="dateList">
            <div style="text-align: center; font-size: 14px;">{{onenew.pubDateStr}}</div>
            <div style="text-align: center; font-size: 12px;">{{onenew.pubDate}}</div>
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
    <!-- <div v-for="(country,index) in predict" :key="index">
      <span v-if="country.name === '美国'">
        {{parseInt(country.data[0])}}
      </span>
      <br>
      <br>
    </div> -->
    <div id="Predict" style="width:800px; height:500px;"></div>
  </div>
</template>

<script>
import axios from 'axios'
import predictData from '../../public/predict.json'
export default{
  data() {
    return {
      list: Array,
      predict: Array
    };
  },
  methods: {
    drawCNMap () {
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#fff'
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
          data: ['累计确诊人数', '预测确诊人数', '增长率','预测增长率']
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '累计确诊人数',
            min: 0,
            max: 250,
            interval: 50,
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              formatter: '{value} K'
            }
          },
          {
            type: 'value',
            name: '增长率',
            min: 0,
            max: 25,
            interval: 5,
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '累计确诊人数',
            type: 'bar',
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, "-"
            ],
            itemStyle: {
              normal:{
                color: "#fffacd"
              }
            }
          },
          {
            name: '预测确诊人数',
            type: 'bar',
            data: [
              "-", "-", "-","-","-","-", 175.6
            ],
            itemStyle: {
              normal:{
                color: "#ff7f50"
              }
            }
          },
          {
            name: '增长率',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, "-"],
            itemStyle: {
              normal:{
                color: "#dcdcdc"
              }
            }
          },
          {
            name: '预测增长率',
            type: 'line',
            smooth: false,
            yAxisIndex: 1,
            data: ["-","-","-","-","-",10.2,20.3],
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
      }
      let mychart = this.$echarts.init(document.getElementById('CN_MapCharts'))
      mychart.setOption(option)
    },
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
    getPredict(){
      this.predict=predictData.predictData
      console.log(this.predict[0].data[0])
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#fff'
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
          data: ['累计确诊人数', '预测确诊人数', '增长率','预测增长率']
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '累计确诊人数',
            min: 0,
            max: 100000000,
            interval: 50,
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              formatter: '{value} K'
            }
          },
          {
            type: 'value',
            name: '增长率',
            min: 0,
            max: 25,
            interval: 5,
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '累计确诊人数',
            type: 'bar',
            data: [
              parseInt(this.predict[0].data[0]),
              parseInt(this.predict[0].data[1]),
              parseInt(this.predict[0].data[2]),
              parseInt(this.predict[0].data[3]),
              parseInt(this.predict[0].data[4]),
              parseInt(this.predict[0].data[5]),
              "-"
            ],
            itemStyle: {
              normal:{
                color: "#fffacd"
              }
            }
          },
          {
            name: '预测确诊人数',
            type: 'bar',
            data: [
              "-", "-", "-","-","-","-", parseInt(this.predict[0].data[6])
            ],
            itemStyle: {
              normal:{
                color: "#ff7f50"
              }
            }
          },
          {
            name: '增长率',
            type: 'line',
            yAxisIndex: 1,
            data: [
              parseInt(this.predict[0].data[0]),
              parseInt(this.predict[0].data[1]),
              parseInt(this.predict[0].data[2]),
              parseInt(this.predict[0].data[3]),
              parseInt(this.predict[0].data[4]),
              parseInt(this.predict[0].data[5]),
              "-"
            ],
            itemStyle: {
              normal:{
                color: "#dcdcdc"
              }
            }
          },
          {
            name: '预测增长率',
            type: 'line',
            smooth: false,
            yAxisIndex: 1,
            data: [
              "-", "-", "-","-","-","-", parseInt(this.predict[0].data[6])
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
      }
      let mychart = this.$echarts.init(document.getElementById('Predict'))
      mychart.setOption(option)
    },
    drawCNLine(){
      //获取全国各省的累计确诊provi_tot_confi
      this.$http({
        method: 'get',
        url: 'http://101.132.138.14:8082/countryGeographyInformation/getChinaInformation',
        params: {
          beginTime: '2021-01-24 17:00:00',
          endTime: '2021-11-24 17:00:00'
        }
      }).then(response => {
        console.log(response)
        })
    }
  },
  mounted(){
    this.drawCNMap() 
    this.getNews()
    this.getPredict()
    this.drawCNLine()
  }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: white;
}
.container {
  width: 15%;
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