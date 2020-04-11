<template>
  <div class="player" @click="gomusic" v-show='show'>
    <div class="left">
      <img :src="songdetail[0].al.picUrl" />
    </div>
    <div class="middle">
      <p>{{songdetail[0].name}}</p>
      <p>{{songdetail[0].ar[0].name}}</p>
    </div>
    <div class="right" @click.stop='playor'>
      <van-circle v-model="currentRate"  size='40px' :speed="1" :text="text"  />
      <audio :src="flag?songurl[0].url:''" loop  autoplay preload  ></audio>
    </div>
  </div>
</template>
<script>
import { mapState , mapMutations, mapActions} from 'vuex';
export default {
  data() {
    return {
      currentRate: 0,
    };
  },
  methods:{
    playor(){
      this.getflag()
      console.log(this.flag)
    },
    gomusic(){
      this.$router.push('/player')
      console.log('点击打div')
      console.log(this.songurl)
    },
    ...mapMutations('toplistdetail',['getflag']),
    // ...mapActions('toplistdetail',['get'])
  },
  computed: {
    ...mapState("toplistdetail", ["songdetail",'songurl','flag','show']),
    text() {
      // if(this.flag)  return this.currentRate;
      return this.currentRate.toFixed(0);
    },
    rate(){
      return this.songurl[0].type
    }
  }
};
</script>
<style lang="scss" scoped>
  .player{
    width: 100vw;
    height: 1.2rem;
    position: fixed;
    box-sizing: border-box;
    left: 0;
    bottom: 0;
    z-index: 10;
    background: white;
    // padding-left: 0.2rem;
    &>.left{
      float: left;
      width: 10%;
      box-sizing: border-box;
      padding-top: 3%;
      
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    &>.middle{
      float: left;
      width: 70%;
      box-sizing: border-box;
      padding-left: 0.2rem;
      p{
        text-align: left;
        overflow: hidden;
        &:first-child{
          height: 0.8rem;
          line-height: 0.8rem;
          font-size:0.4rem;
          overflow: hidden;
        }
        &:last-child{
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.35rem;
        }
      }
    }
    &>.right{
      float: left;
      width: 10%;
      box-sizing: border-box;
      padding-top: 0.2rem;
    }
  }
</style>
