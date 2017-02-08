<template>
    <dl class="et-select">
        <dt class="et-select-dt">
            <a class="et-select-selected" @click.stop.prevent="toggleItems()" :style="{'height':height,'line-height':height}">
                <span class="et-select-selected-span">{{newCurrentLabel}}<span> 条/页</span></span>
                <i class="et-select-selected-i et-icon icon-down-dir" :style="{'line-height':height+' !important'}"></i>
            </a>
        </dt>
        <dd class="et-select-dd">
            <ul class="et-select-items">
                <li v-for="item in labels" @click.stop="selectOptionClick(item)" :class="['et-select-items-li',item == newCurrentLabel ? 'active' : '']" :style="{'height':height,'line-height':height}"><a href="javascript:void(0);">{{item}}<span> 条/页</span></a></li>
            </ul>
        </dd>
    </dl>
</template>

<script>
    import utils from '../../../src/utils/utils.js'
    
    export default{
        name: 'v-select',
        data(){
          return {
              sizeMaps: {
                  'large': 42,
                  'middle': 30,
                  'small': 22
              },

              newCurrentLabel:this.currentLabel
          }
        },
        props:{
            size:{
                type:String
            },

            labels:{
                type:Array,
                require:true
            },

            currentLabel:[String, Number]

        },
        computed:{
            height(){
                return (this.sizeMaps[this.size] || 30)+'px'
            }
        },
        methods:{
            toggleItems(){

                var ele =  document.querySelector(".et-select-dd"),
                    display = ele.currentStyle ? ele.currentStyle.display : getComputedStyle(ele, null).display;

                ele.style.display = display === 'none' ? 'block' : 'none'
            },

            selectOptionClick(item){
                this.newCurrentLabel = item
                this.toggleItems()
            }
        },
        mounted(){
            utils.bind(document,'click',function (e) {

                document.querySelector(".et-select-dd").style.display = 'none'
            })
        }
    }
</script>