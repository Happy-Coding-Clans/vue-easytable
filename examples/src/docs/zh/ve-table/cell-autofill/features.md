:::anchor 禁用单元格选择

:::demo 默认单元格选择是开启的，你可以通过 `cellSelectionOption.enable = false` 关闭

```html
<template>
    <ve-table
        fixed-header
        border-y
        :columns="columns"
        :table-data="tableData"
        :cell-selection-option="cellSelectionOption"
        :cell-autofill-option="cellAutofillOption"
        rowKeyFieldName="rowKey"
    />
</template>

<script>
    export default {
        data() {
            return {
                cellAutofillOption: {
                    directionX: true,
                    directionY: true,
                    beforeAutofill: ({
                        direction,
                        sourceSelectionRange,
                        targetSelectionRange,
                        sourceSelectionData,
                        targetSelectionData,
                    }) => {},
                    afterAutofill: ({
                        direction,
                        sourceSelectionRange,
                        targetSelectionRange,
                        sourceSelectionData,
                        targetSelectionData,
                    }) => {},
                },
                cellSelectionOption: {
                    enable: true,
                },
                columns: [
                    { field: "name", key: "a", title: "Name", align: "left" },
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
                        rowKey: 0,
                    },
                    {
                        name: "Dickerson",
                        date: "1910-06-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Beijing",
                        rowKey: 1,
                    },
                    {
                        name: "Larsen",
                        date: "2000-07-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Chongqing",
                        rowKey: 2,
                    },
                    {
                        name: "Geneva",
                        date: "2010-08-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Xiamen",
                        rowKey: 3,
                    },
                    {
                        name: "Jami",
                        date: "2020-09-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Shenzhen",
                        rowKey: 4,
                    },
                ],
            };
        },
    };
</script>
```

:::
