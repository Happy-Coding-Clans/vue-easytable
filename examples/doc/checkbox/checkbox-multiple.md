

:::demo 多选功能

```html
<template>
   <div>
          <div class="mt30">
               <div class="bold">多选</div>
               <v-checkbox-group v-model="checkboxGroupValue">
                   <v-checkbox label="南瓜"></v-checkbox>
                   <v-checkbox disabled label="西红柿"></v-checkbox>
                   <v-checkbox label="哈密瓜"></v-checkbox>
                   <v-checkbox label="水蜜桃"></v-checkbox>
               </v-checkbox-group>
               [{{checkboxGroupValue.join()}}]
            </div>
            <div class="mt30">
                   <div class="bold">全选</div>

                   <div>
                        <v-checkbox indeterminate label="全选"></v-checkbox>
                        <br/><br/>
                   </div>

                   <v-checkbox-group v-model="checkboxGroupValue">
                       <v-checkbox label="南瓜"></v-checkbox>
                       <v-checkbox disabled label="西红柿"></v-checkbox>
                       <v-checkbox label="哈密瓜"></v-checkbox>
                       <v-checkbox label="水蜜桃"></v-checkbox>
                   </v-checkbox-group>
                   [{{checkboxGroupValue.join()}}]
            </div>
   </div>
</template>

<script>
export default{
    data(){
        return {
               checkboxGroupValue:['西红柿','哈密瓜']
        }
    }
}
</script>
```
:::



