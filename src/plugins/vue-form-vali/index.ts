

let $vm


function touch(){
  console.log(this);   
  let params = this.$params;
  let vali = {
    minLength(v, args){
      if(v.length <= args){
        return false
      }else{
        return true
      }
    },
    maxLength(v, args){
      if(v.length >= args){
        return false
      }else{
        return true
      }
    },
    required(v, args){
      return v ? true : false;
    },
    between(v, args){
      if(typeof args !== 'string'){
        throw new Error('args must be String like this "min,max"');
      }else{
        let minAmax = args.split(',');        
        let nv = parseFloat(v);
        let min = parseFloat(minAmax[0]);
        let max = parseFloat(minAmax[1]);
        console.error(minAmax, nv);        
        if(min < max){          
          if(nv >= min && nv <= max){
            return true
          }else{
            return false
          }
        }else{
          if(nv >= max && nv <= min){
            return true
          }else{
            return false
          }
        }
      }
    },
  }
  let flag = true;
  // 校验参数列表
  for(let [k,v] of Object.entries(params)){
    if(typeof params[k] == 'function'){
      this[k] = params[k](this.$model);
    }else{
      this[k] = vali[k](this.$model, v);
    }
    console.log(2, flag, this[k]);
    if(!this[k] && flag){
      flag = false;
      this.$error = !this[k];
      this.$anyError = !this[k];
    }else{
      this.$error = !this[k];
      this.$anyError = !this[k];
    }
  }
  return this
}

function $touch(){
  let $errorArr = []; 
  for(let [k,v] of Object.entries(this)){     
    if(typeof this[k] !== 'function' && k != '$error'){      
      let vali = touch.call(v);
      $errorArr.push(vali.$error);
    }
  }
  this.$error = $errorArr.find(n => n) || false;
  return this
}


export default {
  install(Vue){    
    Vue.mixin({
      data(){
        return {          
          params: {},          
        }
      },
      computed: {
        $v: {
          set(value: any){                       
            for(let [k,v] of Object.entries(value)){
              touch.call(v);
              v.$touch = touch;                    
            }            
          },
          get(): any{
            this.params.$touch = $touch;
            return this.params
          }
        }  
      },
      created() {
        let vm = this; 
        console.info('后进',vm)
        if(vm.$validata){          
          let $v = {};          
          for (let [k,v] of Object.entries(vm.$validata)) {            
            vm.$set(vm.$data.params, k, {              
              "$model": vm[k],
              "$invalid": true,
              "$dirty": false,
              "$anyDirty": false,
              "$error": false,
              "$anyError": false,
              "$pending": false,
            })                          
            $v[k] = vm.params[k];
            $v[k].$params = v;                       
          }
          vm.$v = $v;                            
        }        
      }, 
      mounted () {
        // delete this.$data.$v;
      },    
      watch: {
        params: {
          handler(val, oldv){        
            for(let [k,v] of Object.entries(val)){              
              if(this[k] != v.$model){
                this[k] = v.$model;
                // touch.call(v);
                val.$touch();
              }                          
            }
          },
          deep: true,
        }
      }
     })
    
  }
}