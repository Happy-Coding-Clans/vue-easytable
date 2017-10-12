:::demo 单选功能

```html
<template>
<div>

     <div class="mt30">
           <div class="bold">单选</div>
           <v-checkbox v-model="checkboxValue1">哈密瓜</v-checkbox>
           <div>{{checkboxValue1}}</div>
     </div>

     <div class="mt30">
             <div class="bold">
             单选禁用</div>
            <v-checkbox disabled v-model="checkboxValue2">哈密瓜</v-checkbox>
            <div>{{checkboxValue2}}</div>

             <v-checkbox disabled v-model="checkboxValue3">哈密瓜</v-checkbox>
             <div>{{checkboxValue3}}</div>
     </div>
</div>
</template>

<script>
export default{
    data(){
        return {
               checkboxValue1:false,
               checkboxValue2:false,
               checkboxValue3:true,
        }
    }
}
</script>
```
:::