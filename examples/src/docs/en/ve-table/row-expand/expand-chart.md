:::anchor Expand Chart

:::demo 1、The third party chart library used by this example：[echarts](https://github.com/apache/incubator-echarts)。The purpose is to fully customize the content of the exhibition line<br>Please refer to the official documents for the specific use of ecarts.This sample document:https://echarts.apache.org/examples/zh/editor.html?c=mix-line-bar

```html
<template>
  <ve-table
    style="width:100%"
    :columns="columns"
    :table-data="tableData"
    :expand-option="expandOption"
    row-key-field-name="rowKey"
  />
</template>

<script>
  import echarts from "echarts";
  export default {
    data() {
      return {
        expandOption: {
          defaultExpandedRowKeys: [1001, 1002],
          render: ({ row, column, rowIndex }, h) => {
            if (row["rowKey"] === 1001) {
              return (
                <div id="chart-container" style="width:800px;height:300px;" />
              );
            } else {
              return (
                <p>
                  My name is <span style="color:#1890ff;">{row.name}</span>,I'm
                  living in {row.address}
                </p>
              );
            }
          },
        },
        columns: [
          {
            field: "",
            key: "a",
            // 设置需要显示展开图标的列
            type: "expand",
            title: "",
            width: 50,
            align: "center",
          },
          {
            field: "name",
            key: "b",
            title: "Name",
            width: 200,
            align: "center",
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
        tableData: [
          {
            rowKey: 1001,
            name: "John",
            date: "1900-05-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Shanghai",
          },
          {
            rowKey: 1002,
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Beijing",
          },
          {
            rowKey: 1003,
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
          },
          {
            rowKey: 1004,
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
          },
          {
            rowKey: 1005,
            name: "Jami",
            date: "2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
          },
        ],
      };
    },
    methods: {
      // render chart
      renderChart() {
        const chartOption = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999",
              },
            },
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          legend: {
            data: ["蒸发量", "降水量", "平均温度"],
          },
          xAxis: [
            {
              type: "category",
              data: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
              ],
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "水量",
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: "{value} ml",
              },
            },
            {
              type: "value",
              name: "温度",
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: "{value} °C",
              },
            },
          ],
          series: [
            {
              name: "蒸发量",
              type: "bar",
              data: [
                2.0,
                4.9,
                7.0,
                23.2,
                25.6,
                76.7,
                135.6,
                162.2,
                32.6,
                20.0,
                6.4,
                3.3,
              ],
            },
            {
              name: "降水量",
              type: "bar",
              data: [
                2.6,
                5.9,
                9.0,
                26.4,
                28.7,
                70.7,
                175.6,
                182.2,
                48.7,
                18.8,
                6.0,
                2.3,
              ],
            },
            {
              name: "平均温度",
              type: "line",
              yAxisIndex: 1,
              data: [
                2.0,
                2.2,
                3.3,
                4.5,
                6.3,
                10.2,
                20.3,
                23.4,
                23.0,
                16.5,
                12.0,
                6.2,
              ],
            },
          ],
        };

        let chartInstance = echarts.init(
          document.getElementById("chart-container")
        );
        chartInstance.setOption(chartOption);
      },
    },
    mounted() {
      this.renderChart();
    },
  };
</script>
```

:::
