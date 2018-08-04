<template>
  <div class='form-vali'>
    <Head :title="title"></Head>
    <div class="form-box">
      <form action="#/form-vali" @submit="submitFn" method="get">
        <div>
          <!-- v-model="$v.name.$model" -->
          姓名：<input :class="{'error': $v.name.$error}" type="text" v-model="$v.name.$model">
          <span style="color: red;">{{$v.name.required ? '*' : ''}}</span>
        </div>
        <pre>
          {{$v.name}}
        </pre>
        <div>
          <p>年龄在20~30岁之间</p>
          年龄：<input :class="{'error': $v.age.$error}" type="number" v-model="$v.age.$model">
          <span style="color: red;">{{$v.age.required ? '*' : ''}}</span>
        </div>
        <div>
          手机：<input :class="{'error': $v.phone.$error}" type="tel" v-model="$v.phone.$model">
          <span style="color: red;">{{$v.phone.required ? '*' : ''}}</span>
        </div>
        <div>
          密码：<input type="password" v-model="password">
          <span style="color: red;">&nbsp;</span>
        </div>

        <div>
          {{toast}}
        </div>        

        <button class="submit-btn" :disabled="submitOk" type="submit">提交</button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Inject, Provide, Watch } from "vue-property-decorator";
import {Head} from '../../components/index'

@Component({
  computed: {
    submitOk(){
      if(this.$v){
        return this.$v.$touch().$error;
      }
    }    
  }, 
  components: {
    Head
  }
})
export default class FormVali extends Vue{
  title = '表单校验';
  name = '你好';
  phone = '11111';
  age = '20';
  password = '';
  toast = '';
  beforeCreate () {
    
  }
  mounted () {
    console.info('先进',this)
  }  

  submitFn(e: Event){    
    // this.$v.name.$touch();
    // this.$v.age.$touch();    
    // let vali = this.$v.$touch();    
    this.toast = '成功';
    setTimeout(()=> (this.toast=''), 1000);
    e.preventDefault(); 
  }

  @Watch('name')
  watchName(name: any){
    console.log(name, this.$v)
  }

  @Watch('$v')
  watch$v(v){
    console.log(v);
  }
}
FormVali.prototype.$validata = {
  name: {
    required: true
  },
  age: {
    required: true,
    between: '20,30'
  },
  phone: {
    required: true,
    check: function(v){
      console.log(v);      
      return /^1[3456789]\d{9}$/.test(v);
    }
  }
}
</script>

<style lang="stylus" scoped>
.form-box
  text-align center
  padding-top 50px
  input 
    outline none
  .submit-btn
    width 180px
    height 40px
    line-height 40px
    -webkit-appearance inherit
    margin-top 20px
    background #111
    color #fff
  .error
    border 1px solid red;
    animation errorTip .25s ease-in
  button:disabled
    background #eee;  


@keyframes errorTip {
  0%{
    transform translateX(-2px)
  }
  50%{
    transform translateX(2px)
  }
  100%{
    transform translateX(0px)
  }
}
</style>

