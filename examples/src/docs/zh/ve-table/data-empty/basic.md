:::anchor 空数据

:::demo

```html
<template>
  <div>
    <button class="button-demo" @click="request()">切换请求</button>
    <br /><br />
    <ve-table :columns="columns" :table-data="tableData" border-y />
    <div v-show="showEmpty" class="empty-data">暂无数据</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { field: "name", key: "a", title: "Name", align: "center", width: "20%" },
          { field: "date", key: "b", title: "Date", align: "left", width: "20%" },
          { field: "hobby", key: "c", title: "Hobby", align: "center", width: "30%" },
          { field: "address", key: "d", title: "Address", align: "left", width: "30%" },
        ],
        tableData: [],
        // show empty
        showEmpty: false,
      };
    },
    methods: {
      request() {
        setTimeout(() => {
          this.tableData =
            this.tableData.length > 0
              ? []
              : [
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
                ];

          if (this.tableData.length === 0) {
            this.showEmpty = true;
          } else {
            this.showEmpty = false;
          }
        });
      },
    },
    created() {
      this.request();
    },
  };
</script>

<style>
  .empty-data {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
    color: #666;
    font-size: 16px;
    border: 1px solid #eee;
    border-top: 0;
  }
</style>
```

:::
