:::anchor header 自定义单元格

:::demo 1、`column`配置中，支持通过属性 `renderHeaderCell`传入渲染函数，与 body 自定义单元格用法一致。`renderHeaderCell`在表头分组中一样适用<br>2、渲染函数接收一个参数，`column`:当前列配置

```html
<template>
  <ve-table
    style="width:100%"
    border-y
    :columns="columns"
    :table-data="tableData.filter(item=>!searchText || item.name.toLowerCase().includes(searchText.toLowerCase()))"
  />
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          {
            field: "name",
            key: "a",
            title: "Name",
            width: 200,
            align: "center",
            renderHeaderCell: ({ column }, h) => {
              return (
                <input
                  // jsx 不能直接使用 v-model。此处为 jsx 实现 v-model，了解更多查看官方文档
                  value={this.searchText}
                  onInput={this.searchInputChange}
                  style="width:90%"
                  placeholder="请输入名称关键字"
                />
              );
            },
          },
          {
            field: "date",
            key: "b",
            title: "Date",
            width: 200,
            align: "center",
            renderHeaderCell: ({ column }, h) => {
              return (
                <span class="text-bold" style="color:#1890ff;">
                  {column.title}
                </span>
              );
            },
          },
          { field: "hobby", key: "c", title: "Hobby", width: 300, align: "left" },
          { field: "address", key: "d", title: "Address", width: "", align: "left" },
        ],
        tableData: [
          {
            name: "John",
            date: "1900-05-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Shanghai",
          },
          {
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding",
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
        // 搜索
        searchText: "",
      };
    },
    methods: {
      // search input change event
      searchInputChange(e) {
        this.searchText = e.target.value;
      },
    },
  };
</script>

<style>
  .text-bold {
    font-weight: bold;
  }
</style>
```

:::
