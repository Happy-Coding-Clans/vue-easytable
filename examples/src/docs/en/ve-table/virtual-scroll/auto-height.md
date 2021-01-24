:::anchor Unequal Row Height

:::demo

```html
<template>
  <div>
    <ve-table
      fixed-header
      :max-height="500"
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
          {
            field: "name",
            key: "b",
            title: "Name",
            width: 200,
            align: "left",
            renderBodyCell: ({ row }, h) => {
              return <span domPropsInnerHTML={row.name}></span>;
            },
          },
          {
            field: "hobby",
            key: "c",
            title: "Hobby",
            width: 300,
            align: "left",
          },
          {
            field: "address",
            key: "d",
            title: "Address",
            width: "",
            align: "left",
          },
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
          let value = i;
          if (i % 2 === 0) {
            const rowCount = this.getRandom(3, 5);

            for (let i = 0; i < rowCount; i++) {
              value += `this is the long word.<br />`;
            }
          }

          data.push({
            rowKey: i,
            name: value,
            date: i,
            hobby: i,
            address: i,
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
