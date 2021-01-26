:::anchor 结合固定列

:::demo

```html
<template>
  <div>
    <ve-table
      fixed-header
      border-y
      :max-height="500"
      :scroll-width="1600"
      :virtual-scroll-option="virtualScrollOption"
      :columns="columns"
      :table-data="tableData"
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
          { field: "col1", key: "a", title: "col1", width: 50, fixed: "left" },
          {
            title: "col2-col3",
            fixed: "left",
            children: [
              {
                field: "col2",
                key: "b",
                title: "col2",
                width: 50,
              },
              {
                field: "col3",
                key: "c",
                title: "col3",
                width: 50,
              },
            ],
          },
          {
            title: "col4-col5-col6",
            children: [
              {
                title: "col4-col5",
                children: [
                  {
                    field: "col4",
                    key: "d",
                    title: "col4",
                    width: 130,
                  },
                  {
                    field: "col5",
                    key: "e",
                    title: "col5",
                    width: 140,
                  },
                ],
              },
              {
                title: "col6",
                field: "col6",
                key: "f",
                width: 140,
              },
            ],
          },
          { field: "col7", key: "g", title: "col7", width: 50, fixed: "right" },
          { field: "col8", key: "h", title: "col8", width: 50, fixed: "right" },
        ],
        tableData: [],
      };
    },
    methods: {
      initData() {
        let data = [];
        for (let i = 0; i < 10000; i++) {
          data.push({
            rowKey: i,
            col1: i,
            col2: i,
            col3: i,
            col4: i,
            col5: i,
            col6: i,
            col7: i,
            col8: i,
            col9: i,
            col10: i,
          });
        }

        this.tableData = data;
      },
    },
    created() {
      this.initData();
    },
  };
</script>
```

:::
