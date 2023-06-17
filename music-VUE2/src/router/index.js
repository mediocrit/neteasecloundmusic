//路由根文件
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//home页面
import Home from '@/views/Home/indexHome.vue'
import FindMusic from '@/views/Home/FindMusic'
import PodCast from '@/views/Home/PodCast'
import MySelf from '@/views/Home/MySelf'
import FollowWithInterest from '@/views/Home/FollowWithInterest'
import CommunityX from '@/views/Home/CommunityX'
//专辑详情页面
import Album from '@/views/Home/itemAblum.vue'
const routes=[
    {
        path:'/',
        redirect: '/home'
        // component:Home
    },
    {
        path:'/home',
        redirect:'/home/findMusic',
        component:Home,
        children:[
            {
                path:'findMusic',
                component:FindMusic
            },
            {
                path:'podCast',
                component:PodCast 
            },
            {
                path:'mySelf',
                component:MySelf
            },
            {
                path:'followWithInterest',
                component:FollowWithInterest
            },
            {
                path:'communityX',
                component:CommunityX
            }

        ]
    },
    //专辑详情页面
    {
        path:'/album',
        component:Album
    }
]

const router=new VueRouter({
    routes
})
export default router