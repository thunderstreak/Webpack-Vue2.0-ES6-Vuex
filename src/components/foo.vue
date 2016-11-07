<template id="">
    <div class="">
        <p>
            {{msg}}
        </p>
        <div class="nav">
            <a @click="toggle('A')" >A</a>
            <a @click="toggle('B')" >B</a>
            <a @click="toggle('C')" >C</a>
        </div>
        <div class="nav-conent">
            <div v-show="flag.A">
                A
                <div class="for" v-for="(item,index) in arr" :key="item.id">{{item}}</div>
            </div>
            <div v-show="flag.B">
                B
                <div class="for" v-for="item in arr">{{item}}</div>
            </div>
            <div v-show="flag.C">
                C
                <div class="for" v-for="item in arr">{{item}}</div>
            </div>
        </div>

        <button @click="sub" type="button" name="button">计算</button>
    </div>
</template>
<script type="text/javascript">
import {mapState,mapActions} from 'vuex';

export default {
    data(){
        return{
            flag:{
                A:true,
                B:false,
                C:false,
            },
            arr:[],
            msg:'路径 : foo.vue'
        }
    },
    computed(){
        console.log(1);
    },
    created(){
        this.Ffor();
    },
    methods:{
        toggle(tag){

            if(tag=='A'&&!this.flag.A){
                this.Ffor();
                this.flag.A=true;
                this.flag.B=false;
                this.flag.C=false;
                console.log(tag);
            }else if(tag=='B'&&!this.flag.B){
                this.Ffor();
                this.flag.A=false;
                this.flag.B=true;
                this.flag.C=false;
                console.log(tag);
            }else if(tag=='C'&&!this.flag.C){
                this.Ffor();
                this.flag.A=false;
                this.flag.B=false;
                this.flag.C=true;
                console.log(tag);
            }
        },
        ...mapActions(['INCREMENT']),
        sub(){
            // console.log(this);
            this.INCREMENT();
            // store.dispatch('INCREMENT');
            console.log(this.$store.count)
        },
        Ffor(){
            let num=Math.floor(Math.random()*10+1);
            this.arr.length=0;
            for(let i=0;i<num;i++){
                this.arr.push({
                    id:i,
                    msg:i+'_msg',
                    text:i+1+'text'
                })
            }
        }
    }
}
</script>
<style>
.nav{
    border:1px red solid;
    text-align: center;
}
.nav>a{
    width: 45px;
    height: 25px;
    line-height: 25px;
    display: inline-block;
    border:1px red solid;
}
.nav-conent>div{
    border:1px blue solid;
    min-height: 50px;
}
.for{
    border:1px red solid;
}
</style>
