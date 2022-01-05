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
        <div id="contextmenu-container">右键点击此区域</div>
        <ve-contextmenu eventTarget="#contextmenu-container" :options="options" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            options: [
              [
                    {
                        label: "菜单1",
                        type: "type1",
                    },
                    {
                        label: "菜单2",
                        type: "type2",
                        children: [
                            {
                                label: "菜单2-1",
                                type: "type2-1",
                            },
                            {
                                label: "菜单2-2",
                                type: "type2-2",
                            },
                        ],
                    },
                    {
                        type: "separator",
                    },
                    {
                        label: "菜单3",
                    },
            ],
        };
    },
};
</script>
```
