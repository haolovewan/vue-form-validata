<template>
  <div>
    <Head :title="title"></Head>
    <div>
      <ul class="flex-box">
        <li class="flex-item" :key="index" v-for="(item,index) in menus">
          <router-link :to="item.path">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import {Head} from '../components/index'

@Component
export default class Home extends Vue{
  title = '首页';

  menus = [
    {
      name: 'form表单校验',
      path: '/form-vali'
    }
  ]

  beforeCreate () {
    this.$options.components.Head = Head;
  }

  mounted () {
      
  }
  
}

</script>

<style lang="stylus" scoped>
.flex-item
  flex 0 1 33%
  height 44px
  line-height 44px
  text-align center
  box-shadow 0 0 2px #111
  a
    text-decoration none
    color: #111
</style>

