:::anchor 长文本破坏布局

:::demo 1、当单元格文本内容过多时会破坏布局，此时可以通过样式 [word-break](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break) 控制<br>2、你也可以结合[单元格省略](#/zh/doc/table/cell-ellipsis)功能一起使用

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
    <br /><br />
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
          { field: "name", key: "a", title: "Name 40%", width: "40%" },
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
          { field: "address", key: "d", title: "Address 20%", width: "20%" },
        ],
        tableData: [
          {
            name: "John",
            date: "1900-05-20",
            hobby:
              "Honorificabilitudinitatibus califragilisticexpialidocious Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu 大江东去浪淘尽千古风流人物故垒西边人道是三国周郎赤壁乱石穿空惊涛拍岸卷起千堆雪江山如画一时多少豪杰",
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
