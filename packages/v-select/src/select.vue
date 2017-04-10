<template>
    <dl :class="['v-select',sizeClass]" v-click-outside="clickOutside">
        <dt class="v-select-dt">
            <a class="v-select-selected" @click.stop.prevent="toggleItems()">
                <span class="v-select-selected-span">{{newCurrentLabel}}<span> 条/页</span></span>
                <i class="v-select-selected-i v-icon icon-down-dir"></i>
            </a>
        </dt>
        <dd v-show="visible" class="v-select-dd">
            <ul class="v-select-items">
                <li v-for="item in labels" @click.stop="selectOptionClick(item)"
                    :class="['v-select-items-li',item == newCurrentLabel ? 'active' : '']">
                    <a href="javascript:void(0);">{{item}}<span> 条/页</span></a></li>
            </ul>
        </dd>
    </dl>
</template>

<script>
    import utils from '../../../src/utils/utils.js'
    import settings from '../../../src/settings/settings.js'
    import clickoutside from '../../../src/directives/clickoutside.js'

    export default{
        name: 'v-select',
        directives: {
            'click-outside':clickoutside
        },
        data(){
            return {
                newCurrentLabel: this.currentLabel,

                visible: false
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
        computed: {
            sizeClass(){
                let size = settings.sizeMaps[this.size] || settings.sizeMapDefault
                return size === settings.sizeMaps['large'] ? ' v-select--large' : (size === settings.sizeMaps['middle'] ? ' v-select--middle' : ' v-select--small')
            }
        },
        methods: {
            toggleItems(){
                this.visible = !this.visible
            },

            selectOptionClick(item){
                this.newCurrentLabel = item
                this.toggleItems()

                this.$emit('selectChangeHandler', this.newCurrentLabel)
            },

            clickOutside(){
                this.visible = false
            }
        }
    }
</script>