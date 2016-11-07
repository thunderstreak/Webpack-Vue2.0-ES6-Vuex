<template id="">
    <div class="">
        <p>
            {{msg}}
        </p>
        <button v-on:click="logout">退出登录</button>
    </div>

</template>
<script type="text/javascript">
import { mapActions } from 'vuex'
export default {
    data(){
        return{
            msg:'多视图路由'
        }
    },
    methods:{
        ...mapActions(['SIGNOUT']),
        logout() {
            this.SIGNOUT()
            this.$router.replace({path: '/login'})
        }
    }
}

</script>
