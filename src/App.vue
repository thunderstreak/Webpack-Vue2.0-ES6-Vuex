<template>
  <div id="firstcomponent">
      <router-link to="/home">Home</router-link>
      <router-link to="/foo">Foo</router-link>
      <router-link to="/bar">Bar</router-link>
      <router-link to="/user/1">user</router-link>
      <!-- 多视图 -->
      <transition name="fade" mode="out-in">
          <router-view></router-view>
      </transition>
      <router-view name="a"></router-view>
      <router-view name="b"></router-view>
      <hr/>
      <router-link :to="{ name: 'routeUser', params: { id: 123 }}">跳转user/123</router-link><br/>
      <button v-on:click="goto123">跳转user/123</button>
      <hr/>
      <!-- <toolbar></toolbar>
      <notes-list></notes-list>
      <editor></editor> -->
  </div>
</template>

<script type="text/javascript">
import Toolbar from './ComponentTodo/Toolbar.vue'
import NotesList from './ComponentTodo/NotesList.vue'
import Editor from './ComponentTodo/Editor.vue'

export default {
    components: {
        Toolbar,
        NotesList,
        Editor
    },
    methods:{
        //根据路由名跳转并附带参数
        goto123(){
            this.$router.push({
                name:'routeUser',
                params:{id:123}
            })
        }
    }
}
</script>

<style>
.router-link-active{
    color: red;
}
</style>
