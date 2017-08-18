<template>
    <div>
        <!--效果展示-->
        <div class="example-effectHtml">
            <slot name="effectHtml"></slot>
        </div>

        <!--代码描述-->
        <div class="example-codeDescription" v-show="showDemo">
            <div class="example-codeDescription-title">
                <span class="example-codeDescription-title-span">代码描述</span>
            </div>
            <slot name="codeDescription"></slot>
        </div>

        <!--代码展示-->
        <div class="example-codeHighlight" v-show="showDemo">
            <slot name="codeHighlight" v-if="showCode"></slot>
            <div class="example-codeHighlight-showCode" @click="showCodeToggle()">
                <i :class="[showCode?'v-icon-up-dir':'v-icon-down-dir']"></i>
                <span>{{showCode ? '收起代码' : '显示代码'}}</span>
            </div>

        </div>

    </div>
</template>

<script>

    export default{
        name: 'demo-box',

        props:{

            showDemo:{
                type:Boolean,
                default:false
            }

        },

        data(){

            return {

                showCode: false

            }
        },
        methods: {
            showCodeToggle(){

                this.showCode = !this.showCode;

            }
        }

    }
</script>