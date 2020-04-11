import Vue from 'vue'
Vue.filter('fname',(data) =>{
    if(!data) return ''
     return data.substring(0,3)

    

    
})
Vue.filter('lname',(data) =>{
    if(!data) return ''
   
        return data.substring(3,6)

    
    
})

Vue.filter('artname',(data) => {
    if(!data) return ''
    
   return data.map(item => item.name).join(' ')
})
Vue.filter('name',(data) => {

    if(!data) return ''
    return data
})