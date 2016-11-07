<template lang="html">
    <div class="testMsg">
        <input type="text" v-model="msg" v-on:change="testChange">
        <select v-model="selected" v-on:change="selectChange">
            <option
                v-for="option in options"
                v-bind:value="option.value">
                {{ option.text }}
            </option>
        </select>
        <span>Selected: {{ selected }}</span>
        <p>
            {{message | capitalize}}
        </p>
        <button type="button" v-on:click="increment">{{counter}}</button>
    </div>
</template>

<script>
export default {
    props:['message'],
    data(){
        return{
            msg:'messages',
            selected: 'A',
            counter:0,
            options: [
                  { text: 'One', value: 'A' },
                  { text: 'Two', value: 'B' },
                  { text: 'Three', value: 'C' }
            ]
        }
    },
    filters:{
        capitalize(val){
            console.log(val);
            if(!val) return '';
            val=val.toString();
            return val.charAt(0).toUpperCase()+val.slice(1);
        }
    },
    methods:{
        testChange(){
            console.log(this.msg);
        },
        selectChange(){
            console.log(this.selected);
        },
        increment(){
            this.counter+=1;
            this.$emit('increment');
        }
    },
    watch:{
        msg(curVal,oldVal){
            console.log(curVal,oldVal);
        }

    },
    computed:{

    }
}
</script>

<style lang="css">
.testMsg{
    border:1px red solid;
}
</style>
