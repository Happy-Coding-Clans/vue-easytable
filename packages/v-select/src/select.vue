<template>
    <v-dropdown class="v-select" v-model="internalOptions"
                is-select
                :size="size"
                :style="{width:width}"
                :width="width"
                :maxWidth="maxWidth"
                :isMultiple="isMultiple"
                :textAlign="textAlign"
                :min="min"
                :max="max"
                :isInput="isInput"
                @change="dropdownChange"
    >
            <span>
                <template v-if="isInput">
                    <input class="v-select-input" :placeholder="placeholder" type="text" v-model="inputValue"/>
                </template>
                <template v-else>
                    <span class="v-select-selected-span">{{showSelectInfo()}}</span>
                </template>
                <i class="v-select-selected-i v-icon-down-dir"></i>
            </span>
    </v-dropdown>
</template>

<script>
    import utils from '../../src/utils/utils.js'
    import settings from '../../src/settings/settings.js'
    import layerAdjustment from '../../src/mixins/layerAdjustment.js'

    import VDropdown from '../../v-dropdown/index'

    export default {
        name: 'v-select',
        components: {
            VDropdown
        },
        mixins: [layerAdjustment],
        data(){
            return {

                visible: false,

                internalOptions: [],

                // 样式前缀
                textAlignPrefix: 'v-select-items-li-a-',

                inputValue: ''
            }
        },
        props: {
            size: {
                type: String
            },

            width: {
                type: Number,
                default: 90

            },

            // select的最大宽度(超出隐藏)
            maxWidth: {
                type: Number
            },

            // 如果为true 会包含 checkbox
            isMultiple: {
                type: Boolean,
                default: false
            },

            // 用户传入v-model 的值 [{value/label/selected}]
            value: [Object, Array],

            // 占位符
            placeholder: {
                type: String,
                default: '请选择',
                validator: function (value) {
                    return value.length > 0
                }
            },

            // 文本居中方式 left|center|right
            textAlign: {
                type: String,
                default: 'left'
            },

            // 最小选中数量
            min: {
                type: Number,
                default: 0
            },

            // 最大选中数量
            max: {
                type: Number,
                default: 999
            },

            // 是否支持输入input
            isInput: {
                type: Boolean,
                default: false
            }

        },
        methods: {

            // 初始化
            init(){
                this.internalOptions = Object.assign([], this.value);

                if (this.isInput) {

                    this.setInputValue();
                }
            },

            // 显示选中的信息
            showSelectInfo(){
                var result, labels;

                labels = this.selectedLabels();
                if (Array.isArray(labels) && labels.length > 0) {
                    result = labels.join();
                } else {
                    result = this.placeholder;
                }

                return result;
            },

            // 当前选中项的label
            selectedLabels(){

                return this.internalOptions.filter(x => x.selected).map(x => {

                    if (x.selected) {
                        return x.label;
                    }
                });
            },

            // dropdown change event
            dropdownChange(){

                // 使用户传入的v-model 生效
                this.$emit('input', this.internalOptions);

                this.$emit('change');
            }
        },

        created(){

            this.init();
        },
        watch: {
            'value': function (val) {
                this.init();
            }
        }
    }
</script>