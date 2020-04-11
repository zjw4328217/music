<template>
  <div id="app">
    <div id="navbar">
      <router-view></router-view>
    </div>
  <player v-if='show'  ></player>
  </div>
</template>
<script>
import player from '@/views/player';
import {mapState} from 'vuex'
export default {
  mounted(){

  },
  components:{
    player
  },
  computed: {
    ...mapState('toplistdetail',['show'])
  },
   updated(){
    console.log(666)
  }
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;

}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #fff;
}

#navbar {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0.4rem;
   background: #fff;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
