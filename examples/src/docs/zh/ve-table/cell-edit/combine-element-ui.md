:::anchor 结合 element-ui

:::demo 1、

```html
<template>
    <div>
        <button class="button-demo" @click="submit()">提交</button>
        <br />
        <br />
        <ve-table
            rowKeyFieldName="rowKey"
            :fixed-header="true"
            :columns="columns"
            :table-data="tableData"
            :cell-selection-option="cellSelectionOption"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // submit data
                submitData: [
                    // {
                    //     rowKey: 0,
                    //     field: "",
                    //     value: "",
                    // },
                ],
                cellSelectionOption: {
                    // default true
                    enable: false,
                },
                columns: [
                    {
                        field: "name",
                        key: "name",
                        title: "Name",
                        align: "left",
                        width: "15%",
                        edit: false,
                    },
                    {
                        field: "date",
                        key: "date",
                        title: "Date",
                        align: "left",
                        width: "15%",
                        edit: false,
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return (
                                <el-date-picker
                                    size="small"
                                    value={row["date"]}
                                    on-input={(val) => {
                                        row["date"] = val;
                                        this.cellDataChange(row, column, val);
                                    }}
                                    type="date"
                                    format="yyyy-MM-dd"
                                    placeholder="选择日期"
                                ></el-date-picker>
                            );
                        },
                    },
                    {
                        field: "age",
                        key: "age",
                        title: "Age",
                        align: "center",
                        width: "30%",
                        edit: false,
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return (
                                <el-input-number
                                    size="small"
                                    min={1}
                                    value={row["age"]}
                                    on-input={(val) => {
                                        row["age"] = val;
                                        this.cellDataChange(row, column, val);
                                    }}
                                ></el-input-number>
                            );
                        },
                    },
                    {
                        field: "address",
                        key: "address",
                        title: "Address",
                        align: "left",
                        width: "40%",
                        edit: false,
                    },
                ],
                // table data
                tableData: [
                    {
                        name: "John",
                        date: "1900-05-20",
                        age: 17,
                        address: "No.1 Century Avenue, Shanghai",
                        rowKey: 0,
                    },
                    {
                        name: "Dickerson",
                        date: "1910-06-20",
                        age: 20,
                        address: "No.1 Century Avenue, Beijing",
                        rowKey: 1,
                    },
                    {
                        name: "Larsen",
                        date: "2000-07-20",
                        age: 22,
                        address: "No.1 Century Avenue, Chongqing",
                        rowKey: 2,
                    },
                    {
                        name: "Geneva",
                        date: "2010-08-20",
                        age: 18,
                        address: "No.1 Century Avenue, Xiamen",
                        rowKey: 3,
                    },
                    {
                        name: "Jami",
                        date: "2020-09-20",
                        age: 29,
                        address: "No.1 Century Avenue, Shenzhen",
                        rowKey: 4,
                    },
                ],
            };
        },
        methods: {
            // submit
            submit() {
                alert(JSON.stringify(this.submitData));
            },

            // cell data change
            cellDataChange(row, column, cellValue) {
                const { submitData } = this;

                let currentCell = submitData.find(
                    (x) => x.rowKey === row["rowKey"] && x.field === column.field,
                );

                if (currentCell) {
                    currentCell.value = cellValue;
                } else {
                    let newCell = {
                        rowKey: row["rowKey"],
                        field: column.field,
                        value: cellValue,
                    };
                    this.submitData.push(newCell);
                }
            },
        },
    };
</script>
```

:::
