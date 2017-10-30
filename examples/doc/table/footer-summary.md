:::demo 通过设置 `footer` 数组对象给 table 添加汇总信息，footer 汇总信息可以设置多行，每一个子数组代表一行汇总信息 <br> **注意**：由于汇总信息格式不定，有求和、平均值、最大值等等，以及保留位数不定等问题。所以汇总信息由调用者提供！
```html
<template>
    <div>
        <v-table
                is-horizontal-resize
                style="width:100%"
                :height="260"
                :columns="columns"
                :table-data="tableData"
                :footer-cell-class-name="setFooterCellClass"
                :footer="footer"
                :footer-row-height="40"
        ></v-table>
    </div>
</template>

<style>
    .footer-cell-class-name-title {
        background-color: #f60;
        color: #fff;
    }

    .footer-cell-class-name-normal {

        color: red;
    }

</style>

<script>

    export default{
        data() {
            return {
                tableData: [
                    {"name": "赵伟", "amount1": "2", "amount2": "3", "amount3": "上海市黄浦区金陵东路569号17楼"},
                    {"name": "李伟", "amount1": "5", "amount2": "4", "amount3": "上海市奉贤区南桥镇立新路12号2楼"},
                    {"name": "孙伟", "amount1": "3", "amount2": "9", "amount3": "上海市崇明县城桥镇八一路739号"},
                    {"name": "周伟", "amount1": "6", "amount2": "10", "amount3": "上海市青浦区青浦镇章浜路24号"},
                    {"name": "吴伟", "amount1": "1", "amount2": "12", "amount3": "上海市松江区乐都西路867-871号"}
                ],
                columns: [
                    {field: 'name',title: '姓名',width: 100,titleAlign: 'center',columnAlign: 'center',isFrozen: true},
                    {field: 'amount1',title: '数值1',width: 260,titleAlign: 'center',columnAlign: 'center',isResize: true},
                    {field: 'amount2',title: '数值2',width: 330,titleAlign: 'center',columnAlign: 'center',isResize: true},
                    {field: 'amount3',title: '数值3',width: 308,titleAlign: 'center',columnAlign: 'left',isResize: true}
                ],
                footer: []
                /* 下面的数据结构
                 footer: [
                    ['最小值',1,3,'-'],
                    ['求和',17,38,'-']
                 ]
                */
            }
        },

        methods: {

            setFooterData(){

                let result = [],
                    amounts1 = this.tableData.map(item => {
                        return item.amount1
                    }),
                    amounts2 = this.tableData.map(item => {
                        return item.amount2
                    });

                let minVal = ['最小值'];
                minVal.push(Math.min.apply(null, amounts1));
                minVal.push(Math.min.apply(null, amounts2));
                minVal.push('-');


                let sumVal = ['求和'];
                sumVal.push(
                    amounts1.reduce((prev, curr) => {

                        return parseInt(prev) + parseInt(curr);
                    }, 0)
                )

                sumVal.push(
                    amounts2.reduce((prev, curr) => {

                        return parseInt(prev) + parseInt(curr);
                    }, 0)
                )

                sumVal.push('-');


                result.push(minVal);
                result.push(sumVal);

                this.footer = result;
            },

            // 设置 footer-cell-class
            setFooterCellClass(rowIndex, colIndex, value){

                if (colIndex === 0) {

                    return 'footer-cell-class-name-title'
                } else {

                    return 'footer-cell-class-name-normal'
                }
            }

        },

        created(){

            this.setFooterData();
        }
    }
</script>
```
:::