<template>
  <el-container style="height:100%;" direction="vertical" >
    <div class="bg">
      <div class="bg_after">
        <div style="margin:10px;">
          <el-container style="position:relative; margin-bottom: 30px; text-align:center">
            <dv-decoration-7 style="height:30px;width:25%;">
              <el-button type="text" class="header_text" @click="Jump2World" style="font-size:22px;width:50%" >
                世界
              </el-button>
            </dv-decoration-7>
            <dv-decoration-7 style="height:30px;width:25%">
              <el-button type="text" class="header_text" @click="Jump2China" style="font-size:22px;width:50%">
                中国
              </el-button>
            </dv-decoration-7>
            <dv-decoration-7 style="height:30px;width:45%">
              <div type="text" class="header_text"  style="font-size:22px; text-align:center;width:50%">
                {{ nowDate }}{{ nowTime }}
              </div>
            </dv-decoration-7>
          </el-container>
            <!--路由占位符-->
            <router-view></router-view>
        </div>

        <div style="height:80px"></div>
        
        <div class="container">
            <div class="fa-left fl text">
                <h4>联系我们</h4>
                    <p>地址：中国 上海曹安公路4800号同济大学软件学院</p>

                    <p>邮编：201804</p>

                    <p>联系电话：86-21-69589585,69589332(FAX)</p>
            </div>
            <div class="fa-mid fl text">
                <a target="_blank" href="http://www.tongji.edu.cn">
                <img src="@/assets/image/tjlogo.png" alt style="
                    filter:drop-shadow(2px 2px 10px white);
                    margin-top:30px;
                "></a>
              
            </div>
            <div class="fa-right fr text">
                <h4>快速链接</h4>
                    <ul>
                        <li><a target="_blank" href="http://sse.tongji.edu.cn/" class="text">软件学院官网</a></li>
                        <br>
                        <li><a target="_blank" href="http://www.tongji.edu.cn" class="text">同济大学官网 </a></li>
                    </ul>
            </div>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
export default{
  data() {
    return {
      nowDate: "",    // 当前日期
      nowTime: "",    // 当前时间
    }
  },
  methods: {
    GetDate(data) {
      let formatDateTime;
      let Y = data.getFullYear();
      let M = data.getMonth() + 1;
      let D = data.getDate();
      let H = data.getHours();
      let Min = data.getMinutes();
      let S = data.getSeconds();
      let W = data.getDay();
      H = H < 10 ? "0" + H : H;
      Min = Min < 10 ? "0" + Min : Min;
      S = S < 10 ? "0" + S : S;
      switch (W) {
        case 0:
          W = "日";
          break;
        case 1:
          W = "一";
          break;
        case 2:
          W = "二";
          break;
        case 3:
          W = "三";
          break;
        case 4:
          W = "四";
          break;
        case 5:
          W = "五";
          break;
        case 6:
          W = "六";
          break;
        default:
          break;
      }
      this.nowDate = Y + "年" + M + "月" + D + "日 ";
      this.nowTime = H + ":" + Min + ":" + S;
    },
    Jump2World() {
      this.$router.push({path: '/world'})
    },
    Jump2China() {
      this.$router.push({path: '/china'})
    },
    Refresh() {
      this.$router.go(0)
    }
  },
  mounted() {
    // 页面加载完后显示当前时间
    this.GetDate(new Date())
    // 定时刷新时间
    this.timer = setInterval(()=> {
       this.GetDate(new Date()) // 修改数据date
    }, 500)
  },
  destroyed() {
    if (this.timer) {  // 注意在vue实例销毁前，清除我们的定时器
      clearInterval(this.timer);
    }
  }
}
</script>


<style lang="less" scoped>
.dv-border-box-9{
    width:100%;
    height: 100%;
}
.el-breadcrumb  /deep/  .el-breadcrumb__inner 
      {
        color: #96dee8 !important;			
        font-size: 20px;
    }
.footer{
    color: #96dee8;
    font-size: 15px;
    text-indent: 2em; 
    margin:5px;
    text-align: center;
    margin-top: 20px;
}
.text{
    color: #ddffff;
}
.fa-left {
    width: 380px;
    position: relative;
    right:40px;
}
.fa-mid {
    width: 300px;
    position: relative;
    left:30px;
}
.fa-right {
    width: 360px;
    position: relative;
    left:90px;
}
.fl {
    float: left;
}
.fr {
    float: right;
}
.container {
    width: 1080px;
    margin: auto;
}
.header_text{
  color: #96dee8;
  font-family: 'zcool';
  font-size: 25px;
  width: 450px;
}
a {
  text-decoration: none;
  color: white;
}
.news_container {
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
