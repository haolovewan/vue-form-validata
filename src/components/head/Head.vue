<template>
  <header class="header">
    <a href="javascript:;"></a>
    <div class="title">{{title}}</div>
    <a href="javascript:;"></a>
  </header>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Head extends Vue{  
  @Prop() title: string;
}

</script>

<style lang="stylus" scoped>
.header
  position relative
  display flex
  height 44px
  line-height 44px
  box-shadow inset 0px -1px 0 0 #111
  .title
    text-align center
    flex 1
</style>

