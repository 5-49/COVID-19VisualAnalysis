<template>
  <div>
    <div id="CN_MapCharts" style="width:800px; height:500px;"></div>
    <div class="list">
      <div class="item" v-for="(item,index) in list" :key="index">
        <div class="time" v-for="(onenew,index) in item.news" :key="index">
            {{ onenew.title }}
            <br>
            <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  data() {
    return {
      list: Array
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
    }
  },
  mounted(){
    this.drawCNMap() 
    this.getNews()
  }
}
</script>

<style lang="less" scoped>

</style>