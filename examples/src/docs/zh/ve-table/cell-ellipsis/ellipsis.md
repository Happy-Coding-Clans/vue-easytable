:::anchor 超出省略

:::demo 通过 `column` 的 `ellipsis` 属性设置超出显示省略。默认单行省略

```html
<template>
  <ve-table
    rowKeyFieldName="rowkey"
    :fixed-header="true"
    :columns="columns"
    :table-data="tableData"
  />
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { field: "name", key: "a", title: "Name", align: "left", width: "15%" },
          { field: "date", key: "b", title: "Date", align: "left", width: "15%" },
          { field: "hobby", key: "c", title: "Hobby", align: "center", width: "30%" },
          {
            field: "address",
            key: "d",
            title: "Address",
            align: "left",
            width: "40%",
            ellipsis: {
              showTitle: true
            },
          },
        ],
        // table data
        tableData: [
          {
            name: "John",
            date: "1900-05-20",
            hobby: "coding and coding repeat",
            address:
              "No.1 Century Avenue, Shanghai,this is a long text,this is a long text,this is a long text,this is a long text",
            rowkey: 0,
          },
          {
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding and coding repeat",
            address:
              "No.1 Century Avenue, Beijing,this is a long text,this is a long text,this is a long text,this is a long text",
            rowkey: 1,
          },
          {
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address:
              "No.1 Century Avenue, Chongqing,this is a long text,this is a long text,this is a long text,this is a long text",
            rowkey: 2,
          },
          {
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen,this is a long text,this is a long text",
            rowkey: 3,
          },
          {
            name: "Jami",
            date: "2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
            rowkey: 4,
          },
        ],
      };
    },
    methods: {},
  };
</script>
```

:::
