import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'
// import Element from 'element-ui'
// Vue.use(Element)

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);//vue使用路由配置
Vue.use(VueResource);//vue使用响应请求

import store from './store/'
// import Store from './statusBar/store.js'

// console.log(store);
// console.log(Store);

// 定义组件
import Bar from './components/bar.vue';
import Foo from './components/foo.vue';
import User from './components/user.vue';
import Home from './components/home.vue';
import Login from './components/login.vue';

const UserHome ={template:'<div>UserHome</div>'}
const UserProfile ={template:'<div>UserProfile</div>'}
const UserPosts ={template:'<div>UserPosts</div>'}

// 创建一个路由器实例
const router = new VueRouter({
    mode: 'history',
    routes:[
        // 默认路由
        // { path: '*',component:Foo},
        { path: '/foo',name: 'routeFoo',component: Foo },
        { path: '/bar',name: 'routeBar',component: Bar },
        {
            path: '/user/:id',//匹配路径
            name: 'routeUser',//路由名称
            component: User,//目标组件
            // 嵌套路由
            children:[
                // 匹配默认组件
                {
                    path:'',
                    component:UserHome
                },
                {
                    path:'profile',
                    component:UserProfile
                },
                {
                    path:'posts',
                    component:UserPosts
                }
            ]
        },
        {
            path:'/',
            meta: { auth: false },//入口需要授权
            name:'routerLogin',
            component:Login
        },
        //多view视图路由
        {
            path:'/home',
            name:'routerHome',
            components:{
                default:Home,
                a:Bar,
                b:Foo
            }
        },
        // 路由重定向
        {
            path:'*',
            redirect:{name:'routerLogin'}
        }
    ]
})

// 路由拦截
router.beforeEach(({meta, path},from,next)=>{
    var {auth = true} = meta
    var isLogin = Boolean(store.state.user.id) //true用户已登录， false用户未登录

    if (auth && !isLogin && path !== '/') {
        return next({ path: '/' })
    }
    next();

    // console.log(meta);
    // console.log(path);

})


// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
new Vue({
    router,//注入路由
    store,//注入状态机
    render: html => html(App)//渲染入口组件
}).$mount('#app')
