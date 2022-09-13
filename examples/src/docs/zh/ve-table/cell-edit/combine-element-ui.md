:::anchor 结合 element-ui

:::demo 1、你也可以结合 element-ui 组件做日期、数字、下拉等编辑功能

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
            :row-style-option="rowStyleOption"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                rowStyleOption: {
                    clickHighlight: false,
                    hoverHighlight: false,
                },
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
                    enable: true,
                },
                columns: [
                    {
                        field: "",
                        key: "a",
                        title: "",
                        width: 50,
                        align: "center",
                        operationColumn: true,
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return ++rowIndex;
                        },
                    },
                    {
                        field: "name",
                        key: "name",
                        title: "Name",
                        align: "left",
                        width: "15%",
                    },
                    {
                        field: "date",
                        key: "date",
                        title: "Date",
                        align: "left",
                        width: "15%",
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
                                    value-format="yyyy-MM-dd"
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
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return (
                                <el-input-number
                                    size="small"
                                    min={1}
                                    value={row["age"]}
                                    on-input={(val) => {
                                        row["age"] = val;
                                    }}
                                    on-change={(val) => {
                                        this.cellDataChange(row, column, val);
                                    }}
                                ></el-input-number>
                            );
                        },
                    },
                    {
                        field: "gender",
                        key: "gender",
                        title: "Gender",
                        align: "left",
                        width: "40%",
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return (
                                <el-select
                                    size="small"
                                    value={row["gender"]}
                                    on-input={(val) => {
                                        row["gender"] = val;
                                        this.cellDataChange(row, column, val);
                                    }}
                                    placeholder="请选择"
                                >
                                    <el-option label="female" value="female"></el-option>
                                    <el-option label="male" value="male"></el-option>
                                </el-select>
                            );
                        },
                    },
                ],
                // table data
                tableData: [
                    {
                        name: "John",
                        date: "1900-05-20",
                        age: 17,
                        gender: "female",
                        rowKey: 0,
                    },
                    {
                        name: "Dickerson",
                        date: "1910-06-20",
                        age: 20,
                        gender: "male",
                        rowKey: 1,
                    },
                    {
                        name: "Larsen",
                        date: "2000-07-20",
                        age: 22,
                        gender: "female",
                        rowKey: 2,
                    },
                    {
                        name: "Geneva",
                        date: "2010-08-20",
                        age: 18,
                        gender: "male",
                        rowKey: 3,
                    },
                    {
                        name: "Jami",
                        date: "2020-09-20",
                        age: 29,
                        gender: "female",
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
