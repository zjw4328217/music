import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
Vue.use(Vuex)

export default ({
    namespaced: true,
    state: {
        defaultlist:[],
        searchlist:{}
    },
    mutations: {
        getdefaultm(state,data){
            state.defaultlist=data
        },
        getlistm(state,data){
            state.searchlist=data
        }
    },
    actions: {
        getdefault(state){
            http.request('/search/hot/detail').then(res => {
                state.commit('getdefaultm',res.data.data)
            })
        },
        getlist({commit},{
            keywords,type
        }){
            type =type || 1;
            http.request(`/search?keywords=${keywords}&type=${type}`).then(res => {
                console.log('就是关键词',type,res.data.result)
                commit('getlistm',{
                    type,
                    content:res.data.result
                })
        })
        }
    },
    modules: {

    }
})
