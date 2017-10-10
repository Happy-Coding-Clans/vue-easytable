<template>
    <v-table
            :width="800"
            :height="350"
            :title-rows="tableConfig.titleRows"
            :columns="tableConfig.columns"
            :table-data="tableConfig.tableData"
    ></v-table>
</template>

<script>

    import mockData from '../../mock/tableData.js'

    export default{
        data(){
            return {
                tableConfig: {
                    multipleSort: false,
                    tableData: [],
                    columns: [
                        {field: 'name', width: 300, columnAlign: 'center',isFrozen:true},
                        {field: 'gender', width: 200, columnAlign: 'center'},
                        {field: 'tel', width: 390, columnAlign: 'center'},
                        {field: 'email', width:330, columnAlign: 'center'}
                    ],

                    titleRows: [
                        [
                            {fields: ['name'], title: 'name1', titleAlign: 'center'},
                            {fields: ['gender'], title: 'gender1', titleAlign: 'center'},
                            {fields: ['tel'], title: '联系方式1', titleAlign: 'center'},
                            {fields: ['email'], title: '邮箱1', titleAlign: 'center'}
                        ],
                        [
                            {fields: ['name'], title: 'name2', titleAlign: 'center',rowspan:3},
                            {fields: ['gender'], title: 'gender2', titleAlign: 'center',rowspan:3},
                            {fields: ['tel'], title: '联系方式2', titleAlign: 'center',rowspan:3},
                            {fields: ['email'], title: '邮箱2', titleAlign: 'center',rowspan:3}
                        ],
                       /* [
                            {fields: ['name'], title: 'name2-3', titleAlign: 'center'},
                            {fields: ['gender'], title: 'gender3', titleAlign: 'center'},
                            {fields: ['tel'], title: '联系方式3', titleAlign: 'center'},
                            {fields: ['email'], title: '邮箱3', titleAlign: 'center'}
                        ],*/
                        [
                            {fields: ['name'], title: 'name3', titleAlign: 'center'},
                            {fields: ['gender'], title: 'gender3', titleAlign: 'center'},
                            {fields: ['tel'], title: '联系方式3', titleAlign: 'center'},
                            {fields: ['email'], title: '邮箱3', titleAlign: 'center'}
                        ],
                        [
                            {fields: ['name'], title: 'name4', titleAlign: 'center'},
                            {fields: ['gender'], title: 'gender4', titleAlign: 'center'},
                            {fields: ['tel'], title: '联系方式4', titleAlign: 'center'},
                            {fields: ['email'], title: '邮箱4', titleAlign: 'center'}
                        ],

                    ]

                }
            }
        },

        created(){

            this.tableConfig.tableData = mockData;
        }
    }
</script>