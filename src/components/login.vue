<template id="">
    <div class="">
        <form class="login" v-on:submit.prevent="submit">
			<div class="line">
				<div v-show="btn && !form.id">id不能为空</div>
				<input type="text" placeholder="输入你的id" v-model="form.id">
			</div>
			<div class="line">
				<div v-show="btn && !form.name">用户名不能为空</div>
				<input type="text" placeholder="输入你的用户名" v-model="form.name">
			</div>
			<button v-bind:disabled="false" v-focus:hello.a.b="Slot">登录</button>
        </form>
        <mt-button @click.native="handleClick" type="default">default</mt-button>
        <mt-button type="primary">primary</mt-button>
        <mt-button type="danger">danger</mt-button>

        <!-- 省市级选择 -->
        <mt-picker
            :slots="addressSlots"
            @change="onAddressChange"
            :visible-item-count="3">
        </mt-picker>

        <p class="page-picker-desc">地址: {{ addressProvince }} {{ addressCity }} {{addressCounty}}</p>
        <!-- <btn type="primary" @click.native="handleClick">123</btn> -->
        <test
            v-bind:message="form.id"
            v-on:increment="incrementTotal"
        ></test>
        <p>
            {{total}}
        </p>

        <mt-button
            @click.native="sheetVisible = true"
            size="large">点击上拉 action sheet</mt-button>
            <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible">
        </mt-actionsheet>


        <mt-button
            @click.native="open('picker4')"
            size="large">点击弹出 Time Picker
        </mt-button>
        <mt-datetime-picker
            ref="picker4"
            type="date"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="handleChange">
        </mt-datetime-picker>
        <p>{{value}}</p>

        <mt-button
            @click.native="popupVisible4 = true"
            size="large">下侧弹出 popup
        </mt-button>
        <mt-popup
            v-model="popupVisible4"
            position="bottom"
            class="mint-popup-4">
            <!-- <mt-picker
                class="popup-address"
                :slots="addressSlots"
                @change="onAddressChange"
                :visible-item-count="5">
            </mt-picker> -->
            <mt-picker
                :slots="dateSlots"
                @change="onDateChange"
                :visible-item-count="3"
                :showToolbar="true"
                :visibleItemCount='3'
                @Slot="Slot"
                >
            </mt-picker>
        </mt-popup>
        <img class="imgs" src="../assets/logo.png"/>
        <div id="example">
          <p>Original message: "{{ message }}"</p>
          <p>Computed reversed message: "{{ reversedMessage }}"</p>
        </div>
    </div>
</template>
<style>
.popup-address{
    border:1px red solid;
    /*width: 100%;*/
    /*height: auto;*/
}
.mint-popup-4 {
    width: 100%;
    .picker-slot-wrapper, .picker-item {
        backface-visibility: hidden;
    }
}
.progress{
    width: 50px;
    height: 50px;
    border:5px red solid;
    border-radius: 50%;
}
circle {
    -webkit-transition: stroke-dasharray .25s;
    transition: stroke-dasharray .25s;
}
.imgs{
    border:1px red solid;
}
</style>
<script type="text/javascript">
// 使用按需载入模块，以便于按需打包，
import {Button,Toast,Picker,DatetimePicker,Actionsheet} from 'mint-ui';
// import Test from './test.vue';

import {mapActions } from 'vuex';
const address={
    '北京': ['北京'],
    '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
    '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
    '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
    '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
    '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州']
}
const county={
    '北京':['通州','昌平','海淀','东城','西城','朝阳','丰台','石景山','门头沟'],
    '广州':['越秀','平湖','山城','外水']
}
export default {

    data() {
        return {
            btn: false, //true 已经提交过， false没有提交过
            value:null,
            sheetVisible:false,//点击上拉 action sheet
            popupVisible4:false,
            actions: [],
            Slot:'123',
            message:'hellow',
            total:0,
            gridData:[],
            form: {
                id: '',
                name: ''
            },
            addressSlots: [
              {
                flex: 1,
                values: Object.keys(address),
                className: 'slot1',
                textAlign: 'center'
              }, {
                divider: true,
                content: '-',
                className: 'slot2'
              }, {
                flex: 1,
                values: ['北京'],
                className: 'slot3',
                textAlign: 'center'
              }, {
                divider: true,
                content: '-',
                className: 'slot4'
              }, {
                flex: 1,
                values: county['北京'],
                className: 'slot5',
                textAlign: 'center'
              }
            ],
            addressProvince: '北京',
            addressCity: '北京',
            addressCounty: '通州',
            dateSlots: [
                {
                    flex: 1,
                    values: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'],
                    className: 'slot1',
                    textAlign: 'right'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'],
                    className: 'slot3',
                    textAlign: 'left'
                }
            ]
        }
    },
    components:{
        mybtn:Button,
        picker:Picker,
        test:Test,
        DatetimePicker:DatetimePicker
    },
    /*自定义指令*/
    directives:{
        focus:{
            /*绑定元素插入时调用*/
            inserted(el){
                // el.focus();
            },
            /*仅仅执行一次*/
            bind(el,binding,vnode){
                console.log('one bind');

                var s = JSON.stringify;
                el.innerHTML =
                'name: '       + s(binding.name) + '<br>' +
                'value: '      + s(binding.value) + '<br>' +
                'expression: ' + s(binding.expression) + '<br>' +
                'argument: '   + s(binding.arg) + '<br>' +
                'modifiers: '  + s(binding.modifiers) + '<br>'
                // 'vnode keys: ' + Object.keys(vnode).join(', ')

            },
            /*执行一次，接触绑定*/
            unbind(){
                console.log('remove unbind');
            },
            /*绑定元素所在模板更新时调用*/
            update(){
                console.log('update');
            },
            /*被绑定元素所在模板完成一次更新周期时候调用*/
            componentUpdate(){
                console.log('componentUpdate');
            }
        }
    },
    /*计算时候需要调用,多用于缓存计算*/
    computed:{
        reversedMessage: function () {
          // `this` points to the vm instance
          return this.message.split('').reverse().join('')
        }
    },
    ready:function(){

    },
    /*当组件创建完成时候调用*/
    created(){
        // console.log(this.$refs);
        // this.$set('gridData','1')

        this.$http.jsonp(
            'https://api.douban.com/v2/movie/top250?count=10',
            {},
            {
                headers: {},
                emulateJSON: true
            }
        ).then(function(response) {
            console.log(response.data);
        }, function(response) {
            console.log(response)
        });
    },
    /*安装组件时候调用*/
    mounted(){
        this.actions = [{
            name: '拍照',
            method: this.takePhoto
        }, {
            name: '从相册中选择',
            method: this.openAlbum
        }];
    },
    methods: {
        ...mapActions(['SIGNIN']),
        submit() {
            this.btn = true
            if(!this.form.id || !this.form.name) return
            this.SIGNIN(this.form)
            this.$router.replace({path: '/home'})
        },
        handleClick(){
            this.$toast('hello');
            console.log(this.$refs);
        },
        incrementTotal(){
            this.total+=1;
        },
        /*省市联动*/
        onAddressChange(picker, values) {
            // if (values[0] > values[1]) {
            //     picker.setSlotValue(1, values[0]);
            // }
            console.log(values);
            console.log(county[values[1]]);
            picker.setSlotValues(1, address[values[0]]);
            picker.setSlotValues(2, county[values[1]]);
            this.addressProvince = values[0];
            this.addressCity = values[1];
            this.addressCounty = values[2];
        },
        /*选择时间*/
        open(picker) {
            // console.log(this.$refs[picker]);
            this.$refs[picker].open();
        },
        handleChange(value) {

            /*Toast({
                message: '已选择 ' + value.toString(),
                position: 'bottom'
            });*/
            this.value=FormatDate(value);
            console.log(this.value);
        },
        /*下弹出层*/
        takePhoto() {
            console.log('taking photo');
        },
        openAlbum() {
            console.log('opening album');
        },
        goBack() {
            history.go(-1);
        },

        onDateChange(picker, values) {
            if (values[0] > values[1]) {
              picker.setSlotValue(1, values[0]);
            }
            this.dateStart = values[0];
            this.dateEnd = values[1];
        }
    }
}
/*
*时间格式化
*params@1:需要格式的时间new Date()形式
*params@2:number 默认返回年月日,2返回年月日时分,3返回时分,4返回时分秒
*/
function FormatDate (strTime,n) {
    var date = new Date(strTime);
    var d='';
    if(n==2){
        d+=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        date.getHours()<10?d+=" 0"+date.getHours():d+=" "+date.getHours();
        date.getMinutes()<10?d+=":0"+date.getMinutes():d+=":"+date.getMinutes();
        return d;
    }else if(n==3){
        date.getHours()<10?d+=" 0"+date.getHours():d+=" "+date.getHours();
        date.getMinutes()<10?d+=":0"+date.getMinutes():d+=":"+date.getMinutes();
        return d;

    }else if(n==4){
        date.getHours()<10?d+=" 0"+date.getHours():d+=" "+date.getHours();
        date.getMinutes()<10?d+=":0"+date.getMinutes():d+=":"+date.getMinutes();
        date.getSeconds()<10?d+=":0"+date.getSeconds():d+=":"+date.getSeconds();
        return d;
    }else{
        return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    }

}
</script>
