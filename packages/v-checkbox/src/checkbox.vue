<template>
    <label class="v-checkbox-wrapper">
        <span :class="checkboxClasses">
            <input
                    class="v-checkbox-input"
                    type="checkbox"
                    :value="label"
                    v-model="model"
                    @change="change"
            />

            <span class="v-checkbox-inner"></span>
        </span>
        <span><slot v-if="showSlot">{{ label }}</slot></span>
    </label>
</template>

<script>
    import utils from '../../src/utils/utils.js'

    export default{
        name: 'v-checkbox',
        props: {
            value: {
                type: [String, Number, Boolean]
            },
            // use in checkbox-group
            label: {
                type: [String, Number],
                require: true
            },
            disabled: Boolean,
            // partial selection effect
            indeterminate: Boolean,
            showSlot:{
                type:Boolean,
                default:true
            }

        },
        data(){
            return {
                model: this.value,
                _checkboxGroup: {}
            }
        },

        computed: {

            checkboxClasses(){

                return [
                    'v-checkbox',
                    {
                        ['v-checkbox-checked']: this.model,
                        ['v-checkbox-disabled']: this.disabled,
                        ['v-checkbox-indeterminate']: this.indeterminate,
                    }
                ]
            },

            isCheckBoxGroup() {

                this._checkboxGroup = utils.getParentCompByName(this, 'v-checkbox-group');
                return this._checkboxGroup ? true : false;
            },
        },

        methods: {

            change (event) {
                if (this.disabled) {

                    this.model = !this.model;
                    return false;
                }
                const checked = event.target.checked;

                this.$emit('input', checked);
                this.$emit('change');

                if (this.isCheckBoxGroup) {

                    this._checkboxGroup.updateModel(this.label, checked);
                }
            },

            initModel(){

                if (this.isCheckBoxGroup) {

                    let checkboxGroup = this._checkboxGroup;
                    if (Array.isArray(checkboxGroup.value) && checkboxGroup.value.length > 0) {

                        if (checkboxGroup.value.indexOf(this.label) > -1) {

                            this.model = true;
                        }
                    }
                } else {

                    this.model = this.value;
                }
            },

            // 通过单选更新 model
            updateModelBySingle(){

                if (!this.disabled){
                    this.model = this.value;
                }
            },

            // 父组件调用更新 model
            updateModelByGroup(checkBoxGroup){

                if (checkBoxGroup.indexOf(this.label) > -1) {

                    if (!this.disabled){
                        this.model = true;
                    }
                }else{

                    if (!this.disabled){
                        this.model = false;
                    }
                }

            }
        },

        mounted(){

            this.initModel();
        },

        watch: {

            'value'(val){

                this.updateModelBySingle();

            }
        }
    }
</script>