<template>
    <div class="v-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
    import utils from '../../src/utils/utils.js'

    export default{
        name: 'v-checkbox-group',

        props: {
            value: {
                type: Array,
                default () {
                    return [];
                }
            }
        },

        methods:{

            updateModel(label,checkedVal){

                let index = this.value.indexOf(label);
                if (index > -1){

                    if (!checkedVal){

                        this.value.splice(index, 1);
                    }
                }else{

                    if (checkedVal){

                        this.value.push(label);
                    }
                }

                this.$emit('input',this.value);
                this.$emit('change');
            }
        },

        watch:{
            // 更新子组件选中状态
            'value'(newVal){

               let children = utils.getChildCompsByName(this,'v-checkbox');

               if (children.length > 0){

                   children.forEach(child =>{

                       child.updateModelByGroup(newVal);
                   })
               }

            }
        }
    }
</script>