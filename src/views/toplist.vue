<template>
  <div>
    <van-nav-bar
      title="排行榜"
      left-text="返回"
      
      left-arrow
      @click-left="onClickLeft"
      
    />
    <div class="big">
      <div class="main" v-for="(item,i) in toplistdetail" @click='getdetailid(item)' :key="i">
      <div class="left">
        <img :src="item.coverImgUrl" alt />
        <span>{{item.updateFrequency}}</span>
      </div>
    </div>
    </div>
    
  </div>
</template>
<script>
import http from "@/util/http";
import { mapState , mapMutations, mapActions} from 'vuex';
export default {
  data() {
    return {
      
    };
  },
  methods:{
      onClickLeft(){
          this.$router.back()
      },
      getdetailid(data){
        console.log(data.name,data.id)
        this.changedetailid(data.id)
        this.getdetail(data.id)
        this.$router.push('/toplist/toplistdetail')
      },
      ...mapMutations('toplistdetail',['getdetailm','changedetailid']),
      ...mapActions('toplistdetail',['getlist','getdetail']),
  },
  mounted() {
    this.getlist()
   
  },
  computed: {
    ...mapState('toplistdetail',['toplistdetail']),
    comlist(){
      return this.toplistdetail
    }
  },
};
</script>
<style lang="scss" scoped>
.big{
  width: 100%;
  height: 18rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
.main {
  width: 30%;
  height: 2.2rem;
  float: left;
  margin-right: 0.2rem;

  .left {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      width: 100%;
      border-radius: 0.2rem;
    }
    span {
      position: absolute;
      left: 0.16rem;
      bottom: 0.2rem;
      font-size: 0.24rem;
      color: #fff;
    }
  }
  
}
}
</style>