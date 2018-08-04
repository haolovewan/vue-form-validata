<template>
  <router-view></router-view>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class App extends Vue{
  title = 'Hello world';
}
</script>

