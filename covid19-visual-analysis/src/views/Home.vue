<template>
  <el-container style="height:100%;" direction="vertical" >
    <div class="bg">
      <div class="bg_after">
        <div style="margin:10px;">
          <el-container style="position:relative; margin-bottom: 30px">
            <dv-decoration-7 style="height:30px;">
              <el-button type="text" class="header_text" @click="Jump2World" style="font-size:22px">
                世界
              </el-button>
            </dv-decoration-7>
            <dv-decoration-7 style="height:30px;">
              <el-button type="text" class="header_text" @click="Jump2China" style="font-size:22px">
                中国
              </el-button>
            </dv-decoration-7>
            <dv-decoration-7 style="height:30px;">
              <el-button type="text" class="header_text" @click="Refresh" style="font-size:22px">
                {{ nowDate }}{{ nowTime }}
              </el-button>
            </dv-decoration-7>
          </el-container>
            <!-- <el-breadcrumb separator="|" style="margin-bottom:30px;margin-left:15px;">
              <el-breadcrumb-item :to="{ path: '/world' }">世界</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/china' }">中国</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/demo' }">预测</el-breadcrumb-item>
            </el-breadcrumb>-->

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
</style>
