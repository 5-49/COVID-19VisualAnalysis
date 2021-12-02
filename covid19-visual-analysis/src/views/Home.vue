<template>
<el-container style="height:100%;" direction="vertical" >
<div class="bg">
<div style="margin:10px;">

    <el-breadcrumb separator="|" style="margin-bottom:30px;margin-left:15px;">
    <el-breadcrumb-item :to="{ path: '/data' }">数据概况</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/analysis' }">预测分析</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/demo' }">测试</el-breadcrumb-item>
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
        

</div>


</el-container>
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
</style>

