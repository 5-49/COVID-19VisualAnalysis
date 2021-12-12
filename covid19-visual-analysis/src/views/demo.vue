<template>
  <div>
    <el-container style="position:relative;">
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
      <!-- <dv-decoration-8 style="width:550px;height:50px;">
      </dv-decoration-8>
      <dv-decoration-5 style="width:550px;height:40px;">
      </dv-decoration-5>
      <dv-decoration-8 :reverse="true" style="width:550px;height:50px;">
      </dv-decoration-8> -->
    </el-container>
  </div>
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
.header_text{
  color: #96dee8;
  font-family: 'zcool';
  font-size: 25px;
  width: 450px;
}
</style>