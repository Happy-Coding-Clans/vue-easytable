:::anchor 区域加载
在表格等容器中显示 Loading 效果
:::demo 1、通过 `target` 参数指定 Loading 的容器。`target`为 DOM 对象或 字符串选择器（可以通过`document.querySelector`获取的字符串）<br>2、`name`参数指定加载效果类型名称<br>3、Loading 实例包含`show`、`close`、`destroy`3 个方法

```html
<template>
    <div>
        <button class="button-demo" @click="show()">开启 Loading</button>
        <button class="button-demo" @click="close()">关闭 Loading</button>
        <br />
        <br />
        <ve-table id="loading-container" :columns="columns" :table-data="tableData" />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loadingInstance: null,
                columns: [
                    { field: "name", key: "a", title: "Name", align: "center" },
                    { field: "date", key: "b", title: "Date", align: "left" },
                    {
                        field: "hobby",
                        key: "c",
                        title: "Hobby",
                        align: "right",
                    },
                    { field: "address", key: "d", title: "Address" },
                ],
                tableData: [
                    {
                        name: "John",
                        date: "1900-05-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Shanghai",
                    },
                    {
                        name: "Dickerson",
                        date: "1910-06-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Beijing",
                    },
                    {
                        name: "Larsen",
                        date: "2000-07-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Chongqing",
                    },
                    {
                        name: "Geneva",
                        date: "2010-08-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Xiamen",
                    },
                    {
                        name: "Jami",
                        date: "2020-09-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Shenzhen",
                    },
                ],
            };
        },
        methods: {
            show() {
                this.loadingInstance.show();
            },
            close() {
                this.loadingInstance.close();
            },
        },
        mounted() {
            this.loadingInstance = this.$veLoading({
                target: document.querySelector("#loading-container"),
                // 等同于
                // target:"#loading-container"
                name: "wave",
            });
            this.show();
        },
        destroyed() {
            this.loadingInstance.destroy();
        },
    };
</script>
```

:::
