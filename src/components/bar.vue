<template id="">
    <div class="">
        <p>
            {{msg}}
        </p>
        <p>
            <button v-on:click="GoTo">跳转指定路由</button>
        </p>
    </div>
</template>
<script type="text/javascript">
import router from 'vue-router';

export default {
    data(){
        return{
            msg:'路径 : bar.vue'
        }
    },
    //定义自定义事件
    methods:{
        GoTo(){
            console.log(this.$router);
            // 自定义路由跳转需要路由名且根据需要带参数，若无路由名，则必须指定路径跟所需参数。
            this.$router.push({
                path:'/user',
                name:'routeUser',
                params:{id:22}
            })
        }
    }

}
</script>
