import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
Vue.use(Vuex)

export default ({
    namespaced: true,
    state: {
        toplistdetail: {},
        listId:'',
        detailids: [],
        playsong:[],
        songurl:'',
        songlyric:'',
        songdetail:'',
        flag:false,
        show:true,
        toplist:[],
        isplay:false
    },
    mutations: {
        getdetailm(state, data) {
            state.toplistdetail = data
        },
        changedetailid(state, data) {
            state.detailids = data
        },
        getlistId(state,data){
            state.listId=data
        },
        getsong(state,data){
            state.playsong=data
        },
        geturlm(state,data){
            state.songurl=data
            
        },
        getflag(state){
            state.flag=!state.flag
        },
        hideit(state){
            state.show=false
        },
        showit(state){
            state.show=true
        },
        getsongdetailm(state,data){
            state.songdetail=data
        },
        gettoplist(state,data){
            state.toplist=data
        },
        playm(state){
            state.isplay=true
        },
        getlyricm(state,data){
            state.songlyric=data
        }

    },
    actions: {
        getlist(state) {
            http.request("/toplist").then(res => {
                state.commit('getdetailm', res.data.list)
            });
        },
        getdetail(state,id) {
            state.commit('getlistId',id)
            http.request(`/playlist/detail?id=${id}`).then(res => {
                state.commit('changedetailid',res.data.privileges)
               
            });
        },
        getsongdetail(state,id){
            http.request(`/song/detail?ids=${id}`).then(res => {
                state.commit('getsongdetailm',res.data.songs)

               
            });
        },
        geturl(state,id){
            http.request(`/song/url?id=${id}`).then(res => {
                state.commit('geturlm',res.data.data)
               
            });
           
        },
        getlyric({commit},id){
            http.request(`lyric?id=${id}`).then(res => {
                console.log('geturl中数据',res.data)
                commit('getlyricm',res.data)
            })
        }
    },
    modules: {
    }
})
