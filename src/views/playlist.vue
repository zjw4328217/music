<template>
  <div>
    <div v-show="!flag">
      <van-nav-bar title="歌单" left-text="返回" left-arrow @click-left="onClickLeft" />

      <van-tabs v-model="active" class="songlist" @click='getlist'>
        <van-tab v-for="(item,i) in list" :key="i" :title="item" >
          内容{{item}}
          <swiper
            :dataone="{
                  effect : 'coverflow',
                  slidesPerView: 3,
                  centeredSlides: true,
                  coverflowEffect: {
                  rotate: 30,
                  stretch: 10,
                  depth: 60,
                  modifier: 2,
                  slideShadows : true
                  },
      
            }"
            :key="list.length"
            randomid="top"
            v-if="((item==='推荐')&&(list.length>0))?1:0"
          >
            <div
              class="swiper-slide swiperbig"
              :style="{backgroundImage:'url('+data.coverImgUrl+')'}"
              v-for="data in playlist"
              :key="data.id"
            >
              <p>{{data.name}}</p>
              <span>
                <van-icon name="play" />
              </span>
            </div>
          </swiper>
            <ul class="mainimg">
              <li @click='godetail(data)'  v-for="data in recomondlist" :key='data.id'>
              <div class="divimg">
                <img :src="data.coverImgUrl" alt="">
              </div>
                <p class="overflowp">{{data.name}}</p>
            </li>
          </ul>
        </van-tab>
         
        <div @click="flag=true" class="littlelogo">
          <van-icon size="0.5rem" name="apps-o" />
        </div>
       
      </van-tabs>
    </div>

    <div v-show="flag" class="shadowlist">
      <van-nav-bar title="歌单标签" left-arrow @click-left="flag=!flag" />
      <ul>
        <li style="margin-bottom:10px;" v-for="item in categories.content" :key="item.index">
          <p>{{categories.name[item.index]}}</p>
          <van-button
            round
            style
            type="default"
            v-for="(data,i) in item.content"
            :key="i"
            @click="getid(data)"
          >
            {{data.name}}
            <van-icon class="hot" :name="data.hot?'fire-o':''" />
          </van-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import http from "@/util/http";
import swiper from "@/components/swiper";
export default {
  data() {
    return {
      active: 0,
      list: ["推荐", "官方", "精品", "欧美"],
      categories: {},
      flag: false,
      playlist: [],
      recomondlist:[]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    getid(data) {
      console.log(data.resourceCount);
      console.log(data.name);
    },
    godetail(data){
      console.log(data.id)
    },
    getlist(name,title){
        // this.recomondlist=this.categories.content[name].content
    }
  },
  components: {
    swiper
  },
  mounted() {
    http.request("/playlist/catlist").then(res => {
      this.categories.name = res.data.categories;
      var temparr = [];
      for (var val in this.categories.name) {
        temparr.push({
          index: val,
          content: res.data.sub.filter(item => item.category == val)
        });
      }
      this.categories.content = temparr;
    });
    http.request("/top/playlist?limit=3").then(res => {
      this.playlist = res.data.playlists;
    });
    http.request("/top/playlist").then(res => {
      console.log(res.data);
      this.recomondlist=res.data.playlists.slice(3)
    });
  },
  computed: {
   
    
  },
};
</script>

<style lang="scss" scoped>
.songlist {
  position: relative;
  .littlelogo {
    width: 0.6rem;
    background: #fff;
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    .lvan-icon {
      font-size: 0.2rem;
    }
  }
}
.shadowlist {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left:6%; 
  background: #fff;
  z-index: 5;
  ul {
    width: 100%;
    & > li {
      width: 100%;
      margin-bottom: 0.6rem;
      p {
        text-align: left;
        margin-bottom: 0.2rem;
      }
      .van-button {
        width: 20%;
        margin-right: 2%;
        margin-bottom: 0.2rem;
        float: left;
        height: 0.6rem;
        line-height: 0.6rem;
        overflow: hidden;
        position: relative;
        .hot {
          position: absolute;
          left: 0.04rem;
          top: 0.16rem;
          color: red;
        }
      }
    }
    li:nth-child(1) {
      margin-top: 0.2rem;
      height: 2.2rem;
    }
    li:nth-child(2) {
      height: 5.4rem;
      .van-button:last-child {
        font-size: 0.3rem;
      }
    }
    li:nth-child(3) {
      height: 3.2rem;
    }
    li:nth-child(4) {
      height: 3rem;
    }
    li:nth-child(5) {
      height: 2rem;
    }
  }
}

.swiperbig {
  width: 50%;
  height: 3rem;
  position: relative;
  background-size: 100% 100%;
  margin-bottom: 10px;
  span {
    display: block;
    width: 0.6rem;
    height: 0.6rem;
    line-height: 0.6rem;
    border-radius: 50%;
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    text-align: center;
  }
}
.mainimg{
  width: 100%;
  height: 4rem;
  &>li{
    width: 31%;
    height: 2rem;
    float:left;
    margin-right:2%;
    margin-bottom: 0.1rem;
    .divimg{
      width: 100%;
      height: 1.2rem;
      
      img{
        width: 100%;
        height: 100%;
        border-radius: 0.1rem;
      }
    }
    p{
         height: 0.8rem;
         overflow: hidden;
         font-size: 0.32rem;
      }
  }
}
</style>