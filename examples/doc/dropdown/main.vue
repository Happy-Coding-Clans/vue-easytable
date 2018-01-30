<template>
    <div>
        <div>
            <h3>单选功能</h3>
            <v-dropdown v-model="options1"
            >
                <div style="color:blue;cursor: pointer;">点击这里<i class="v-icon-down-dir"></i></div>
            </v-dropdown>

            <h3>多选功能</h3>
            <v-dropdown v-model="options2"
                        is-multiple
            >
                <div style="color:blue;cursor: pointer;">点击这里<i class="v-icon-down-dir"></i></div>
            </v-dropdown>

            <h3>设置尺寸</h3>
            <v-dropdown v-model="options3"
                        size="small"
            >
                <div style="color:blue;cursor: pointer;">点击这里<i class="v-icon-down-dir"></i></div>
            </v-dropdown>

            <v-dropdown v-model="options3"
                        size="middle"
            >
                <div style="color:blue;cursor: pointer;">点击这里<i class="v-icon-down-dir"></i></div>
            </v-dropdown>

            <v-dropdown v-model="options3"
                        size="large"
            >
                <div style="color:blue;cursor: pointer;">点击这里<i class="v-icon-down-dir"></i></div>
            </v-dropdown>

            <h3>操作功能</h3>
            111
            <v-dropdown v-model="options4"
                        show-operation
                        is-multiple
                        @on-filter-confirm="filterConfirm"
                        @on-filter-rest="filterRest"
            >
                <div style="color:blue;cursor: pointer;">点击这里<i class="v-icon-down-dir"></i></div>
            </v-dropdown>
        </div>
    </div>
</template>

<script>
    export default{

        data(){

            return {

                options1: [
                    {value: 0, label: '张三'},
                    {value: 1, label: '李四'},
                    {value: 2, label: '王二'}
                ],

                options2: [
                    {value: 0, label: '张三'},
                    {value: 1, label: '李四'},
                    {value: 2, label: '王二'}
                ],

                options3: [
                    {value: 0, label: '张三'},
                    {value: 1, label: '李四'},
                    {value: 2, label: '王二'}
                ],

                options4: [
                    {value: 0, label: '张三'},
                    {value: 1, label: '李四'},
                    {value: 2, label: '王二'}
                ],
            }
        },

       methods:{

           filterConfirm(option){

               console.log('on-filter-confirm',option)
           },

           filterRest(option){

               console.log('on-filter-rest',option)
           },
       }

    }
</script>