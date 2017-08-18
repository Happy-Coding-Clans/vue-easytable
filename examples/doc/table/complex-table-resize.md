:::demo 复杂表格自适应配置与简单表格一样
```html
<template>
  <div>
      <v-table
              is-horizontal-resize
              style="width:100%"
              :height="500"
              even-bg-color="#f2f2f2"
              :title-rows="tableConfig.titleRows"
              :columns="tableConfig.columns"
              :table-data="tableConfig.tableData"
              row-hover-color="#eee"
              row-click-color="#edf7ff"
      ></v-table>
  </div>
</template>

<script>

    import tableDate from '../../mock/tableData.js'

    export default{
        data(){
            return {
                tableConfig: {

                    multipleSort: false,
                    tableData: [],
                    titleRows: this.getTitleRows(),
                    columns: [
                        {
                            field: 'custome', width: 50, titleAlign: 'center', columnAlign: 'center',
                            formatter: function (rowData, index) {
                                return index < 3 ? '<span style="color:red;font-weight: bold;">' + (index + 1) + '</span>' : index + 1
                            }, isFrozen: true
                        },
                        {field: 'name', width: 100, columnAlign: 'center', isFrozen: true,isResize:true},
                        {field: 'gender', width: 150, columnAlign: 'center', isFrozen: true},
                        {field: 'height', width: 150, columnAlign: 'center', isFrozen: true},
                        {field: 'tel', width: 150, columnAlign: 'center'},
                        {field: 'email', width: 200, columnAlign: 'center'},
                        {field: 'hobby', width: 200, columnAlign: 'left',isResize:true},
                        {field: 'job', width: 330, columnAlign: 'left',isResize:true}
                    ]
                }
            }
        },

        methods: {
            getTitleRows(){

                var rows = [];
                rows.push([
                        {fields: ['custome'], title: '排序', titleAlign: 'center', rowspan: 2},
                        {fields: ['name', 'gender', 'height'], title: '基础信息', titleAlign: 'center', colspan: 3},
                        {fields: ['tel', 'email'], title: '联系方式', titleAlign: 'center', colspan: 2},
                        {fields: ['hobby','job'], title: '爱好', titleAlign: 'center', rowspan: 2,colspan: 2}
                    ],
                    [
                        {fields: ['name'], title: '姓名', titleAlign: 'center'},
                        {fields: ['gender'], title: '性别', titleAlign: 'center', orderBy: 'asc'},
                        {fields: ['height'], title: '身高', titleAlign: 'center', orderBy: 'desc'},
                        {fields: ['tel'], title: '手机号码', titleAlign: 'center'},
                        {fields: ['email'], title: '邮箱', titleAlign: 'center'}
                    ]);

                var otherData = [
                    {
                        name1: '行业均值(算术平均)',
                        name2: '14,400.39',
                        name3: '8.69',
                        name4: '2,785',
                        name5: '50.28',
                        name6: '11.7538'
                    },
                    {
                        name1: '行业中位数',
                        name2: '14,400.39',
                        name3: '8.69',
                        name4: '2,785',
                        name5: '50.28',
                        name6: '11.7538'
                    },
                ]

                otherData.forEach(item => {
                    rows.push([
                        {fields: ['custome', 'name', 'gender'], title: item.name1, titleAlign: 'center', colspan: 3},

                        {fields: ['height'], title: item.name2, titleAlign: 'center'},
                        {fields: ['tel'], title: item.name3, titleAlign: 'center'},
                        {fields: ['email'], title: item.name4, titleAlign: 'center'},
                        {fields: ['hobby'], title: item.name5, titleAlign: 'center'},
                        {fields: ['job'], title: item.name6, titleAlign: 'center'}
                    ]);
                })
                return rows;
            }
        },

        created(){

            setTimeout(function () {
                this.tableConfig.tableData = tableDate;
            }.bind(this),20)
        }
    }
</script>
```
:::