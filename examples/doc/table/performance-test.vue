<template>
  <div>


      <v-table
              is-horizontal-resize
              style="width:65%"
              :columns="columns"
              :table-data="tableData"
              row-hover-color="#eee"
              row-click-color="#edf7ff"
              odd-bg-color="#61abf5"
              table-bg-color="orange"
      ></v-table>

    <!--  <table class="tableInfo" style="width:1000px;">
          <tr v-for="data in tableData">
              <td style="width: 100px;height: 100px" v-for="col in columns">{{data[col]}}</td>
          </tr>
      </table>-->
  </div>
</template>

<style>

    .tableInfo td{

        border:1px solid #666;
    }

</style>

<script>

    import Vue from 'vue'

    export default{
        data() {
            return {
                tableData: [],
                columns: [
                   /* {width: 60, titleAlign: 'center',columnAlign:'center',type: 'selection'},*/
                    {field: 'name', title: '姓名', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'tel', title: '手机号码', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'hobby', title: '爱好', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'address', title: '地址', width: 280, titleAlign: 'center', columnAlign: 'left',isResize:true},
                    /*{field: 'custome-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation2',isResize:true}*/
                ]
            }
        },

        created(){

            let data = [];

            for(var i=0;i<10000;i++){

                data.push({name:'伟'+i,tel:'138183887'+i,hobby:'钢琴、书法、唱歌'+i,address:'上海市黄浦区金陵东路569号17楼'+i});
            }

            this.tableData = data;
        }
    }

    // 自定义列组件
    Vue.component('table-operation2',{
        template:`<span>
        <a href="" @click.stop.prevent="update(rowData,index)">编辑</a>&nbsp;
        <a href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
        </span>`,
        props:{
            rowData:{
                type:Object
            },
            field:{
                type:String
            },
            index:{
                type:Number
            }
        },
        methods:{
            update(){

                // 参数根据业务场景随意构造
                let params = {type:'edit',index:this.index,rowData:this.rowData};
                this.$emit('on-custom-comp',params);
            },

            deleteRow(){

                // 参数根据业务场景随意构造
                let params = {type:'delete',index:this.index};
                this.$emit('on-custom-comp',params);

            }
        }
    })
</script>