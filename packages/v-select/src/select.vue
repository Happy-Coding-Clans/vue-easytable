<template>
    <dl :class="['et-select',sizeClass]">
        <dt class="et-select-dt">
            <a class="et-select-selected" @click.stop.prevent="toggleItems()">
                <span class="et-select-selected-span">{{newCurrentLabel}}<span> 条/页</span></span>
                <i class="et-select-selected-i et-icon icon-down-dir"></i>
            </a>
        </dt>
        <dd class="et-select-dd">
            <ul class="et-select-items">
                <li v-for="item in labels" @click.stop="selectOptionClick(item)"
                    :class="['et-select-items-li',item == newCurrentLabel ? 'active' : '']">
                    <a href="javascript:void(0);">{{item}}<span> 条/页</span></a></li>
            </ul>
        </dd>
    </dl>
</template>

<script>
    import utils from '../../../src/utils/utils.js'
    import settings from '../../../src/settings/settings.js'

    export default{
        name: 'v-select',
        data(){
            return {
                newCurrentLabel: this.currentLabel
            }
        },
        props: {
            size: {
                type: String
            },

            labels: {
                type: Array,
                require: true
            },

            currentLabel: [String, Number]

        },
        computed:{
            sizeClass(){
                let size = settings.sizeMaps[this.size] || settings.sizeMapDefault
                return size === settings.sizeMaps['large'] ? ' et-select--large' :(size === settings.sizeMaps['middle'] ? ' et-select--middle' :' et-select--small')
            }
        },
        methods: {
            toggleItems(){

                var ele = document.querySelector(".et-select-dd"),
                    display = ele.currentStyle ? ele.currentStyle.display : getComputedStyle(ele, null).display;

                ele.style.display = display === 'none' ? 'block' : 'none'
            },

            selectOptionClick(item){
                this.newCurrentLabel = item
                this.toggleItems()

                this.$emit('selectChangeHandler',this.newCurrentLabel)
            }
        },
        mounted(){

            utils.bind(document, 'click', function (e) {
                var ele = document.querySelector(".et-select-dd")
                if (ele !== null) {
                    ele.style.display = 'none'
                }

            })
        }
    }
</script>