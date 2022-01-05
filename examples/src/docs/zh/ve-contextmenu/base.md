:::anchor 基础示例

:::demo

```html
<template>
    <div>
        <div id="contextmenu-container">右键点击此区域</div>

        <ve-contextmenu eventTarget="#contextmenu-container" :options="options"></ve-contextmenu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                options: [
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

                    {
                        label: "菜单4",
                        disabled: true,
                        children: [
                            {
                                label: "菜单4-1",
                                children: [
                                    {
                                        label: "菜单4-1-1",
                                        disabled: true,
                                    },
                                    {
                                        label: "菜单4-2-2",
                                    },
                                ],
                            },
                            {
                                label: "菜单4-2",
                            },
                        ],
                    },
                    {
                        label: "菜单5",
                        children: [
                            {
                                label: "菜单5-1",
                                children: [
                                    {
                                        label: "菜单5-1-1",
                                        disabled: true,
                                    },
                                    {
                                        label: "菜单5-2-2",
                                    },
                                ],
                            },
                            {
                                type: "separator",
                            },
                            {
                                label: "菜单5-2",
                            },
                        ],
                    },
                ],
            };
        },
    };
</script>
<style>
    #contextmenu-container {
        display: flex;
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
