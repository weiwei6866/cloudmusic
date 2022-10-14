import VueRouter from "vue-router";

import Vue from "vue";

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
       {
        path:'/layout',
        name:'layout',
        component:()=>import('@/views/layout'),
        children:[
            {
                path:'/layout/home',
                name:"home",
                component:()=>import('@/views/layout/home')
            },
            {
                path:'/layout/search',
                name:'search',
                component:()=>import('@/views/layout/search')
            },
            {
                path:"/layout/login",
                name:'login',
                component:()=>import('@/views/layout/login')
               }
        ]
       },

       {
        path:'/',
        redirect:'/layout/home'
       },
       {
        path:'/musicplaycenter',
        name:'musicplaycenter',
        component:()=>import('@/views/musicPlayCenter')
       },
       {
        path:'/comments',
        name:'comments',
        component:()=>import('@/views/comments')
       },
       {
        path:'/album',
        name:'album',
        component:()=>import('@/views/album')
       },






    ]
})


export default router