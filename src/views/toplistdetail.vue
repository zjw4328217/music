<template>
  <div>
    <!-- <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" /> -->
    <van-nav-bar :border='border' fixed class="vanbar" title=""  left-arrow @click-left="onClickLeft">
        <van-icon name="search" slot="right" @click='gosearch' />
    </van-nav-bar>
    <div class="logo" v-if="list">
      <!-- <p>{{list.name | fname}}</p>
      <p>{{list.name | lname}}</p> -->
      <van-image
  width="100%"
  height="100%"
  :src="list.coverImgUrl"
/>
    </div>
    <ul class="main">
      <div class="play">
        <van-icon name="play-circle-o" />
        <span v-if="list.tracks.length>0" @click='playall(list.tracks)'>播放全部(共{{list.tracks.length}}首)</span>
        <van-button color="red" icon="plus" round type="info">收藏</van-button>
      </div>
      <li v-for="(item,i) in list.tracks" :key="item.id" @click='goplay(item)'>
        <div class="left">{{i+1}}</div>
        <div class="middle">{{item.name}}</div>
        <div class="right">
          <van-icon name="play-circle-o" />
        </div>
      </li>
    </ul>
    <!-- <p class="bottom">到底了</p> -->
  </div>
</template>
<script>
import http from "@/util/http";
import filter from "@/util/filter";
import { mapState, mapMutations , mapActions} from "vuex";
export default {
  data() {
    return {
      list: {
        tracks:[]
      },
      border:false
    };
  },
  
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    goplay(item){
      console.log(item)
    
      // this.getsong(item)
      this.getflag()
      this.geturl(item.id)
      this.getsongdetail(item.id)
      this.getlyric(item.id)
      this.playm()
      
    },
    playall(data){
      console.log(data)
      this.gettoplist(data)
    },
    gosearch(){
      this.$router.push('/search')
    },
    ...mapMutations('toplistdetail',['getsong','getflag','gettoplist','playm']),
    ...mapActions('toplistdetail',['geturl','getsongdetail','getlyric'])
  },
  mounted() {
    http.request(`/playlist/detail?id=${this.listId}`).then(res => {
      this.list = res.data.playlist;
      console.log(res.data)
      console.log('1111111111111111111111111111111')
      console.log(this.list)

    });
    http.request('/song/url?id=1426883824').then(res => {
      console.log("歌曲", res.data);
    });
    
  },
  computed: {
    ...mapState("toplistdetail", ["listId", "detailids"])
  }
};
</script>

<style lang="scss" scoped>
.vanbar{
  box-sizing: border-box;
  width: 100%;
  background:transparent;

}
.logo {
  width: 100%;
  height: 5.5rem;
  box-sizing: border-box;
  
  background: skyblue;
  // padding-top: 1rem;
  // padding-left: 0.2rem;
  position: absolute;
  left: 0;
  top: 0;
  p {
    text-align: left;
  }
  p:first-child {
    font-size: 0.5rem;
  }
  p:last-child {
    font-size: 0.8rem;
  }
}
.main {
  width: 100%;
  box-sizing: border-box;
  height: auto;
  margin-bottom: 1.5rem;
  position: absolute;
  left: 0;
  top:4.8rem;
  padding-top: 1.2rem;
  background: white;
  border-radius: 0.8rem 0.8rem 0 0;
  .play{
      width: 100%;
      height:1rem;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 0.1rem;
      padding-left:0.6rem; 
      display: flex;
      &>.van-icon{
           margin-top: 0.3rem;
      }
      &>span{
        display: block;
        height: 1rem;
        line-height: 1rem;
        // width: 5rem;
          font-size: 0.32rem;
          margin-left: 0.35rem;
      }
      &>.van-button{
          height: 0.6rem;
          line-height: 0.6rem;
          width: 2rem;
          text-align: left;
          font-size: 0.32rem;
          margin-top: 0.2rem;
          margin-left: 1rem;
      }
      
  }
  li {
    height: 0.8rem;
    .left {
      float: left;
      width: 20%;
     
    }
    .middle {
      float: left;
      width: 70%;
      height: 100%;
      box-sizing: border-box;
     
    }
    .right {
      float: right;
      color: red;
      margin-right: 15px;
    }
  }
}

</style>