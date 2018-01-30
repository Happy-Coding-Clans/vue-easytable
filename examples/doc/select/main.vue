<template>
    <div>
       <div>
           <h3>基本功能</h3>
           <v-select name="basic"
                     v-model="selectReportTypes1"
                     placeholder="姓名"
           >
           </v-select>

           <h3>多选功能</h3>
           <v-select name="basic"
                     is-multiple
                     v-model="selectReportTypes2"
                     placeholder="姓名"
           >
           </v-select>

           <h3>单选设置尺寸</h3>
           <v-select name="basic"
                     v-model="selectReportTypes3"
                     placeholder="姓名"
                     size="small"
           >
           </v-select>
           <v-select name="basic"
                     v-model="selectReportTypes3"
                     placeholder="姓名"
                     size="middle"
           >
           </v-select>
           <v-select name="basic"
                     v-model="selectReportTypes3"
                     placeholder="姓名"
                     size="large"
           >
           </v-select>

           <h3>多选设置尺寸（目前多选尺寸下拉框未实现）</h3>
           <v-select name="basic"
                     v-model="selectReportTypes3"
                     placeholder="姓名"
                     is-multiple
                     size="small"
           >
           </v-select>
           <v-select name="basic"
                     v-model="selectReportTypes3"
                     placeholder="姓名"
                     is-multiple
                     size="middle"
           >
           </v-select>
           <v-select name="basic"
                     v-model="selectReportTypes3"
                     placeholder="姓名"
                     is-multiple
                     size="large"
           >
           </v-select>
       </div>
    </div>
</template>

<script>
    export default{

        data(){

            return {

                selectReportTypes1: [
                    {value: 0, label: '张三'},
                    {value: 1, label: '李四'},
                    {value: 2, label: '王二'}
                ],

                selectReportTypes2: [
                    {value: 0, label: '张三'},
                    {value: 1, label: '李四'},
                    {value: 2, label: '王二'}
                ],

                selectReportTypes3: [
                    {value: 0, label: '张三'},
                    {value: 1, label: '李四'},
                    {value: 2, label: '王二'}
                ],
            }
        }

    }
</script>