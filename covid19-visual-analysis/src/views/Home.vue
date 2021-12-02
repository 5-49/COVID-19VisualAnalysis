<template>
<div>
<div class="bg"></div>
    <vue-particles
      color="#39AFFD"
      :particleOpacity="0.2"
      :particlesNumber="150"
      shapeType="circle"
      :particleSize="4"
      linesColor="#8DD1FE"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.2"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
      class="particle"
    />
<el-container style="height:100%;" direction="vertical" >
<div style="margin:10px;">

    <el-breadcrumb separator="|" style="margin-bottom:30px;margin-left:15px;">
    <el-breadcrumb-item :to="{ path: '/world' }">世界</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/china' }">中国</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/demo' }">预测</el-breadcrumb-item>
</el-breadcrumb>

    <!--路由占位符-->
    <router-view></router-view>
</div>

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
        


</el-container>
</div>
</template>

<script>

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
    color: #c0dde0;
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
.bg {
    width: 100%;
    height: 100%;
    background-image: url("../assets/image/bg.jpg");
    background-size:100% 100%;
    margin-left: -8px;
    margin-top: -8px;
    background-repeat: no-repeat;
    background-position: right top;
    background-attachment: fixed;

    z-index: -3;
    position: absolute;
    background-color: rgb(60, 50, 82);
}
.bg:after{
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    background-color: rgb(0, 0, 0);
    opacity: 0.5;
    z-index: -2;
    width: 100%;
    height: 100%;
}
.particle {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #ffffff00;
  z-index: -1;
}
</style>

