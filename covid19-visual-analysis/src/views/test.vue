<template>
  <div class="about">
    <el-button type="text" class="info_text" @click="test1" style="font-size:22px" >test1</el-button>
    <el-button type="text" class="info_text" @click="test2" style="font-size:22px" >test2</el-button>
  </div>
</template>

<script>
export default{
  methods: {
    test1(){
      this.$http.get('/countryGeographyInformation/getGeographyInformationByCountryId?id=10000')
    },
    test2(){
      this.$http.get('​/countryGeographyInformation​/getGeographyInformationByCountryName','中国')
    }
  }
}
</script>