<template>
  <div>
    <van-tabbar v-model="active" class="top">
      <van-tabbar-item icon='label'></van-tabbar-item>
      <router-link to="/login" tag="van-tabbar-item">我的</router-link>
      <van-tabbar-item>发现</van-tabbar-item>
      <van-tabbar-item>云村</van-tabbar-item>
      <van-tabbar-item>视频</van-tabbar-item>
      <van-tabbar-item @click='gosearch' icon="search"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
    data() {
    return {
      active: 2
    }
  },
  methods:{
    gosearch(){
      this.$router.push('/search')
    }
  }
}
</script>
<style lang="scss" scoped>
.top{
  position: fixed;
  left: 0;
  top: 0;
  height: 40px;
}  
</style>