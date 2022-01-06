:::anchor 基础示例

:::demo

```html
<template>
    <div>
        <div id="contextmenu-target">
            <div>右键点击此区域</div>
            <div style="font-size:30px;color:red;">{{contextmenuType}}</div>
        </div>

        <ve-contextmenu
            eventTarget="#contextmenu-target"
            :options="options"
            @on-node-click="contextmenuClick"
        ></ve-contextmenu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // contextmenu type
                contextmenuType: "",
                // contextmenu options
                options: [
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
                                type: "menu2-2",
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
                    {
                        label: "menu4",
                        disabled: true,
                        children: [
                            {
                                label: "menu4-1",
                            },
                        ],
                    },
                    {
                        label: "menu5",
                        type: "menu5-type",
                        children: [
                            {
                                label: "menu5-1",
                                type: "menu5-1-type",
                                children: [
                                    {
                                        label: "menu5-1-1",
                                    },
                                    {
                                        label: "menu5-2-2",
                                        type: "menu5-2-2-type",
                                    },
                                ],
                            },
                            {
                                label: "menu5-2",
                                disabled: true,
                            },
                            {
                                type: "separator",
                            },
                            {
                                label: "menu5-3",
                                type: "menu5-3-type",
                            },
                        ],
                    },
                ],
            };
        },
        methods: {
            contextmenuClick(type) {
                this.contextmenuType = type;
            },
        },
    };
</script>
<style>
    #contextmenu-target {
        display: flex;
        flex-direction: column;
        width: 300px;
        height: 300px;
        justify-content: center;
        align-items: center;
        background: #eee;
        border: 3px dashed #666;
        border-radius: 8px;
    }
</style>
```

:::
