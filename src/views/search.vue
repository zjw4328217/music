<template>
  <div>
    <form action="/">
    <van-search
      v-model="content"
      show-action
      placeholder="请输入搜索关键词"
      @change='search'
      @search="onSearch"
      @cancel="onCancel"
    />
    </form>
    
    <div class="normalsearch defaultlist" v-if='!content'>
      <h3>热搜榜</h3>
      <van-cell class="normallist" v-for="(item,i) in defaultlist" :key="i" @click='gosearch(item)'>
          <div class="left" :class="i<3?'active':''" >{{i+1}}</div>
          <div class="middle">
              <p>{{item.searchWord}}
                  <van-icon :name="item.iconUrl" />
              </p>
              <p>{{item.content}}</p>
          </div>
          <div class="right">
              <span>{{item.score}}</span>
          </div>
          </van-cell>
    </div>
    <div v-else>
      <van-tabs v-model="active"  @click='totab'>
       <van-tab :title="item.name" v-for='(item,i) in searchtabs' :key='i' >
         <!-- <van-loading v-if='list.length <=0' type="spinner" /> -->
        

         <div v-if='searchlist.type==1'>
            <van-cell  class="normallist searchlist" v-for="(item,i) in list" :key="i" @click='goplay(item)'>
                
            <div class="middle">
                <p>{{item.name }}</p>
                <p>{{item.artists | artname}}</p>
            </div>
            <div class="right">
              <van-icon color='red' size='0.5rem' name="play-circle" />
            </div>
          </van-cell>
         </div>
          <div v-if='searchlist.type==10'>
            <van-cell  class="normallist searchlist" v-for="(item,i) in list" :key="i" @click='goplay(item)'>
              <div class="left"  >
                  <img class="typeimg" :src="item.blurPicUrl" alt="">
                  </div>
             <div class="middle">
                <p>{{item.name}}</p>
                <p>{{item.type}}</p>
             </div>
              <div class="right">
              <span>{{item.score}}</span>
              </div>
          </van-cell>
         </div>
          <div v-if='searchlist.type==100'>
            <van-cell  class="normallist searchlist" v-for="(item,i) in list" :key="i" @click='goplay(item)'>
           <div class="left">
             <img class="artistimg" :src="item.picUrl" alt="">
           </div>
           <div class="middle">
                <p>{{item.name}}</p>
                <p>{{item.artists | artname}}</p>
            </div>
          </van-cell>
         </div>
          <div v-if='searchlist.type==1000'>
            <van-cell  class="normallist searchlist" v-for="(item,i) in list" :key="i" @click='goplay(item)'>
            <div class="left">
             <img class="playlistimg" :src="item.coverImgUrl" alt="">
           </div>
            <div class="middle">
                <p>{{item.name}}</p>
                <p>{{item.description}}</p>
            </div>
          </van-cell>
         </div>
           <div v-if='searchlist.type==1002'>
            <van-cell  class="normallist searchlist" v-for="(item,i) in list" :key="i" @click='goplay(item)'>
            <div class="left">
             <img class="artistimg" :src="item.avatarUrl" alt="">
           </div>
            <div class="middle usermiddle">
                <p>{{item.nickname}}</p>
            </div>
            <div class=" userright">
              <van-button icon="plus" type="danger" round >关注</van-button>
            </div>
          </van-cell>
         </div>
         
        </van-tab>
     
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { mapActions, mapState, mapMutations } from "vuex";
import http from "@/util/http";
import filter from '@/util/filter';
export default {
  data() {
    return {
      content: "",
      active: 1,
      searchtabs:[
        {
          id:1018,
          name:'综合'
        },
        {
          id:1,
          name:'单曲'
        },
        {
          id:10,
          name:'专辑'
        },
        {
          id:100,
          name:'歌手'
        },
        {
          id:1000,
          name:'歌单'
        },
        {
          id:1002,
          name:'用户'
        },
        {
          id:1004,
          name:'MV'
        },
        {
          id:1006,
          name:'歌词'
        },
        {
          id:1009,
          name:'电台'
        },
        {
          id:1014,
          name:'视频'
        },
        
      ]
    };
  },
  methods: {
      goplay(data){
        // console.log(data)
        data.name && this.getsongdetail(data.id)
        data.name && this.geturl(data.id)
        data.name && this.getlyric(data.id)
      },
      totab(data,name){
        console.log('search点击',data,name)
        console.log('content',this.content)
        var tempid=this.searchtabs.filter(item => item.name===name)[0].id
        console.log(tempid)
        this.getlist({
          keywords:this.content,
          type:tempid})
      },
      gosearch(data){
           data.searchWord && (this.content=data.searchWord)
           data.searchWord && this.getlist({
            keywords:this.content,
            type:1
           })
           
      },
    onSearch(val) {
    //   this.content=val;
      
    },
    search(val){
       this.getlist({keywords:val,
            type:1})
    },
    onCancel() {
      this.$router.back();
    },
    ...mapActions("search", ["getdefault",'getlist']),
    ...mapMutations('toplistdetail',['getsong']),
    ...mapActions('toplistdetail',['geturl','getsongdetail','getlyric'])
  },
  mounted() {
    // this.active=5;
    this.getdefault();
     http.request(`/search?keywords= 追&type=1018`).then(res => {
                console.log('type1018', res.data)
                // state.commit('geturlm',res.data.data)
               
            });
            http.request(`/search?keywords= 追&type=1`).then(res => {
                console.log('type 1', res.data)
                // state.commit('geturlm',res.data.data)
               
            });
             http.request(`lyric?id=1426829004`).then(res => {
                console.log('geturlyirc中数据',res.data)
                // commit('getlyricm',res.data)
            })
  },
  computed: {
    ...mapState("search", ["defaultlist",'searchlist']),
    list(){
      console.log('点击列表切换',this.searchlist.content.songs)
         switch(this.searchlist.type){
        case 1:
          return this.searchlist.content.songs;
          break;
          case 10:
          return this.searchlist.content.albums;
          break;
          case 100:
          return this.searchlist.content.artists;
          break;
          case 1000:
          return this.searchlist.content.playlists;
          break;
           case 1002:
          return this.searchlist.content.userprofiles;
          break;
      }
   
      // return this.searchlist.content.songs
    }
  },
};
</script>

<style lang="scss" scoped>
.defaultlist{
  height: 22rem;
  
}
.normalsearch{
    h3{
        background-color: #fff;
    }
    .normallist{
        width: 100%;
        height: 1.1rem;
        padding: 0 0.15rem 0 0.15rem;
        box-sizing: border-box;
        
         height: 1rem;
        }
    
}
.active{
    color:red;
}
.left{
            width: 15%;
            height: 1rem;
            line-height: 1rem;
            float: left;
            &>img{
              width: 100%;
            }
            &>.artistimg{
              border-radius: 50%;
            }
            &>.playlistimg{
              border-radius: 0.1rem;
            }
        }
        .middle{
            width: 75%;
            height: 1rem;
            float: left;
            p{
                overflow: hidden;
                &:first-child{
                    font-size: 0.25rem;
                    height: 0.5rem;
                }
                &:last-child{
                    height: 0.4rem;
                    font-size: 0.22rem;
                }
            }
        }
        .right{
            width: 10%;
            font-size: 0.05rem;
            float: right;
        }
        .usermiddle{
          width: 60%;
        }
        .userright{
          width: 25%;
          float: left;
          font-size: 0.05rem;
          &>.van-button{
            width: 1.4rem;
            height: 0.6rem;
            padding: 0;
            // border-radius:0.2rem;
            line-height: 0.6rem;
          }
        }
</style>