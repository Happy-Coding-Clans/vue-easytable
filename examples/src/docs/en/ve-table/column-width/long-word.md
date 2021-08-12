:::anchor Long text destroys layout

:::demo 1、Too much text in a cell destroys the layout,This can be controlled by style [word-break](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break) <br>2、You can also use it with [Cell Ellipsis](#/en/doc/table/cell-ellipsis)

```html
<template>
    <div>
        word-break：
        <el-radio-group size="small" v-model="wordBreak">
            <el-radio-button label="normal">normal</el-radio-button>
            <el-radio-button label="keep-all">keep-all</el-radio-button>
            <el-radio-button label="break-all">break-all</el-radio-button>
            <el-radio-button label="break-word">break-word</el-radio-button>
        </el-radio-group>
        <br />
        <br />
        <ve-table
            :style="{'word-break':wordBreak}"
            :columns="columns"
            :table-data="tableData"
            :border-around="true"
            :border-x="true"
            :border-y="true"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                wordBreak: "normal",
                columns: [
                    {
                        field: "name",
                        key: "a",
                        title: "Name 40%",
                        width: "40%",
                    },
                    { field: "date", key: "b", title: "Tel 20%", width: "20%" },
                    {
                        field: "hobby",
                        key: "c",
                        title: "Hobby 20%",
                        width: "20%",
                        /*   ellipsis: {
              showTitle: true,
              lineClamp: 5,
            }, */
                    },
                    {
                        field: "address",
                        key: "d",
                        title: "Address 20%",
                        width: "20%",
                    },
                ],
                tableData: [
                    {
                        name: "John",
                        date: "1900-05-20",
                        hobby: "Honorificabilitudinitatibus califragilisticexpialidocious Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu 大江东去浪淘尽千古风流人物故垒西边人道是三国周郎赤壁乱石穿空惊涛拍岸卷起千堆雪江山如画一时多少豪杰",
                        address: "No.1 Century Avenue, Xiamen",
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
    };
</script>
```

:::
