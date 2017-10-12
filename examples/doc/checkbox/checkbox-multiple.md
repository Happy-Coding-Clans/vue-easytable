

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
                             :indeterminate="indeterminate"
                             v-model = "checkedAllModel"
                             label="全选"
                             @click.prevent.native="handleCheckAll"
                            ></v-checkbox>
                        <br/><br/>
                   </div>

                   <v-checkbox-group v-model="checkboxGroupDefaultValue2">
                       <v-checkbox v-for="item in checkboxGroupInitValues" :disabled="item.disabled" :label="item.label"></v-checkbox>
                   </v-checkbox-group>
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
                    {disabled:true,label:'西红柿'},
                    {disabled:false,label:'哈密瓜'},
                    {disabled:false,label:'水蜜桃'},
               ],

               checkboxGroupDefaultValue2:['西红柿','哈密瓜'],

               indeterminate:false,
               checkedAllModel:false
        }
    },
    methods:{
        // 判断是否有部分选中
        hasPartChecked(){

            return this.checkboxGroupInitValues.some(x=>{

                        return this.checkboxGroupDefaultValue2.indexOf(x.label) > -1;
                })
        },

        // 是否全部选中
        hasAllChecked(){
            return this.checkboxGroupInitValues.every(x=>{

                                   return this.checkboxGroupDefaultValue2.indexOf(x.label) > -1;
                   })
        },

        // 是否存在禁用已选中的复选框
        hasDisabledChecked(){

           return  this.checkboxGroupInitValues.filter(x=>x.disabled).some(x=>{

                return this.checkboxGroupDefaultValue2.indexOf(x.label) > -1;
           })
        },

        // 是否存在禁用未选中的复选框
        hasDisabledUnChecked(){

           return  this.checkboxGroupInitValues.filter(x=>x.disabled).some(x=>{

                return this.checkboxGroupDefaultValue2.indexOf(x.label) === -1;
           })
        },


        handleCheckAll(){
            // 存在部分选中则全选（如果有'禁用未选中的复选框'不能全选）
            if (this.indeterminate){

                   if (!this.hasDisabledUnChecked()){

                        this.indeterminate = false;
                        this.checkedAllModel = true;

                        // 取消选中
                   }
            }else{ // 没有部分选中

                if (this.checkedAllModel){ // 全选状态则取消全选

                    // （如果有'禁用已选中的复选框'则为部分选中）
                    if (this.hasDisabledChecked()){

                      this.indeterminate = true;

                           // 取消选中
                    }
                }else{ // 都没选状态则全选



                }

            }

        }
    },
    created(){
        // 判断是否有部分选中
        this.indeterminate = this.hasPartChecked();

        // 判断是否是全选状态
        this.checkedAllModel = this.hasAllChecked();
    }
}
</script>
```
:::



