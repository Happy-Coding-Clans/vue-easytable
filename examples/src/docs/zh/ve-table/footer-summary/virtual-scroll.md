:::anchor footer 结合虚拟滚动

:::demo 1、表格设置了虚拟滚动，footer 汇总自动支持，无需额外配置

```html
<template>
  <div>
    <ve-table
      fixed-header
      :max-height="500"
      :virtual-scroll-option="virtualScrollOption"
      :columns="columns"
      :table-data="tableData"
      :footer-data="footerData"
      row-key-field-name="rowKey"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        virtualScrollOption: {
          // 是否开启
          enable: true,
        },

        columns: [
          { field: "name", key: "b", title: "Name", width: 200, align: "left" },
          { field: "hobby", key: "c", title: "Hobby", width: 300, align: "left" },
          { field: "address", key: "d", title: "Address", width: "", align: "left" },
        ],
        tableData: [],
      };
    },
    methods: {
      getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      initData() {
        let data = [];
        for (let i = 0; i < 10000; i++) {
          data.push({
            rowKey: i,
            name: i,
            date: i,
            hobby: i,
            address: i,
          });
        }

        this.tableData = data;

        this.footerData = [
          {
            rowKey: 0,
            name: "平均值",
            date: 1100,
            hobby: 1200,
            address: 1300,
          },
          {
            rowKey: 1,
            name: "汇总值",
            date: 701000,
            hobby: 801000,
            address: 801000,
          },
        ];
      },
    },
    created() {
      this.initData();
    },
  };
</script>
```

:::
