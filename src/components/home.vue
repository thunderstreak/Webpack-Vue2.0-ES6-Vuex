<template id="">
    <div class="">
        <p>
            {{user.name}}
        </p>
        <button v-on:click="logout">退出登录</button>
    </div>

</template>
<script type="text/javascript">
import { mapState,mapActions } from 'vuex'
export default {
    data(){
        return{
            msg:'多视图路由'
        }
    },
    computed: mapState({user: state => state.user}),
    methods:{
        ...mapActions(['SIGNOUT']),
        logout() {
            this.SIGNOUT()
            this.$router.replace({path: '/login'})
        }
    }
}
</script>
