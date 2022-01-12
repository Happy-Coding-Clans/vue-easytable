:::anchor 使用方法

引入 `VeContextmenu`

```javascript
import Vue from "vue";
import { VeContextmenu } from "vue-easytable";

Vue.use(VeContextmenu);
```

使用

```javascript
<template>
    <div>
         <div id="contextmenu-target" ref="contextmenuTargetRef">
            <div>右键点击此区域</div>
        </div>
        <ve-contextmenu eventTarget="#contextmenu-target" :options="options" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            eventTarget:"",
            options: [
              [
                    {
                        label: "menu1",
                        type: "menu1-type",
                    },
                    {
                        label: "menu2",
                        type: "menu2-type",
                        children: [
                            {
                                label: "menu2-1",
                                type: "menu2-1-type",
                            },
                            {
                                label: "menu2-2",
                                type: "menu2-2-type",
                            },
                        ],
                    },
                    {
                        type: "separator",
                    },
                    {
                        label: "menu3",
                        type: "menu3-type",
                    },
            ],
        };
    },
     mounted() {
            /*
            eventTarget can be the following case:
            1、this.eventTarget = "#contextmenu-target";
            2、this.eventTarget = document.querySelector('#contextmenu-target');
            3、this.eventTarget = this.$refs["contextmenuTargetRef"];
            */
            this.eventTarget = this.$refs["contextmenuTargetRef"];
    },
};
</script>
```
