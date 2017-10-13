

:::demo 多选功能

```html
<template>
   <div>
          <div class="mt30">
               <div class="bold">多选</div>
               <v-checkbox-group v-model="checkboxGroupDefaultValue1">
                   <v-checkbox label="南瓜"></v-checkbox>
                   <v-checkbox disabled label="西红柿"></v-checkbox>
                   <v-checkbox label="哈密瓜"></v-checkbox>
                   <v-checkbox label="水蜜桃"></v-checkbox>
               </v-checkbox-group>
               [{{checkboxGroupDefaultValue1.join()}}]
            </div>
            <div class="mt30">
                   <div class="bold">全选</div>

                   <div>
                        <v-checkbox
                            @change="handleCheckAll"
                             :indeterminate="indeterminate"
                             v-model = "checkedAllModel"
                             label="全选"

                            ></v-checkbox>
                        <br/><br/>
                   </div>

                   <v-checkbox-group v-model="checkboxGroupDefaultValue2" @change="handleCheckGroupChange">
                       <v-checkbox v-for="item in checkboxGroupInitValues" :disabled="item.disabled" :label="item.label"></v-checkbox>
                   </v-checkbox-group>
                   <br>
                   [{{checkboxGroupDefaultValue2.join()}}]
            </div>
   </div>
</template>

<script>
export default{
    data(){
        return {
               checkboxGroupDefaultValue1:['西红柿','哈密瓜'],

               checkboxGroupInitValues:[
                    {disabled:false,label:'南瓜'},
                    {disabled:false,label:'西红柿'},
                    {disabled:false,label:'哈密瓜'},
                    {disabled:false,label:'水蜜桃'},
               ],

               checkboxGroupDefaultValue2:['南瓜','哈密瓜','水蜜桃'],

               indeterminate:true,
               checkedAllModel:false
        }
    },

    computed:{

            // 是否全部选中
            hasAllChecked(){
                  return this.checkboxGroupInitValues.every(x=>{

                            return this.checkboxGroupDefaultValue2.indexOf(x.label) > -1;
                      })
            },

            // 判断是否有部分选中
            hasPartChecked(){

                return this.checkboxGroupInitValues.some(x=>{

                            return this.checkboxGroupDefaultValue2.indexOf(x.label) > -1;
                    })
            },
    },

    methods:{

        // 全选
        checkAll(){
            let all = this.checkboxGroupInitValues.map(item=>{

               return item.label;
            })

            this.checkboxGroupDefaultValue2 = all;
        },

        unCheckAll(){

            this.checkboxGroupDefaultValue2 = [];
        },

        handleCheckAll(){

            if (this.checkedAllModel){

                 this.checkAll();
            }else{

                 this.unCheckAll();
            }

            this.indeterminate = false;
        },

        // checkbox-group change
        handleCheckGroupChange(){

            if (this.hasAllChecked){

                this.checkedAllModel = true;
                this.indeterminate = false;

            }else if(this.hasPartChecked){

                this.indeterminate = true;

            }else{

                this.indeterminate = false;
                this.checkedAllModel = false;
            }

        }
    }
}
</script>
```
:::



