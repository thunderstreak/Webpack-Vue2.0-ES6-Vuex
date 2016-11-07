<template id="">
    <div class="">
        <p>
            路由参数:{{$route.params.id}}
        </p>
        <p>
            {{msg}}<br/>
            <router-link to="/user/1/profile">profile</router-link>
            <router-link to="/user/1/posts">UserPosts</router-link>
            <router-link to="/user/1">UserHome</router-link>
        </p>
        fetchData：
        <p v-for="art in articles">
            {{art.title}}
        </p>
        <router-view></router-view>
        <button type="button" name="button" v-on:click="goBack">返回</button>
    </div>
</template>
<script type="text/javascript">
export default {
    data(){
        return{
            msg : '路径 : user.vue\r\n--嵌套路由',
            articles:[]
        }
    },
    created(){
            console.log('组件创建完成');
            this.fetchData();
    },
    watch:{
        //路由复用监听
        '$route' (to,from) {
            console.log('路由被复用');
        }
    },
    methods:{
        // 浏览器后退
        goBack(e){
            this.$router.go(-1);
            // history.back()
        },
        fetchData(){
            this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
                headers: {},
                emulateJSON: true
            }).then(function(response) {
              // 这里是处理正确的回调
                this.articles = response.data.subjects
                console.log(this.articles);
                // this.articles = response.data["subjects"] 也可以
            }, function(response) {
                // 这里是处理错误的回调
                console.log(response)
            });
        }
    }
}
</script>
