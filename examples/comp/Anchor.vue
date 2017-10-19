<template>
    <div class="anchor-container" v-if="label.length > 0 && id.length > 0">
        <a class="anchor-link" @click.stop="goAnchor()" :id="id" :label="label" href="javascript:void(0)">#</a>
        <div class="anchor-label">
            <h1 v-if="h1">{{ label }}</h1>
            <h2 v-if="h2">{{ label }}</h2>
            <h3 v-if="h3">{{ label }}</h3>
            <h4 v-if="h4">{{ label }}</h4>
            <h5 v-if="h5">{{ label }}</h5>
            <h6 v-if="h6">{{ label }}</h6>
        </div>
        <slot></slot>
    </div>
</template>

<style scoped>

    .anchor-link{
        font-weight: bold;
    }

    .anchor-label{

        display: inline-block;
    }
</style>

<script>
    export default{
        props:{
            label:{
                type:String,
                default:''
            },

            id:{
                type:String,
                default:''
            },

            h1: Boolean,
            h2: Boolean,
            h3: Boolean,
            h4: Boolean,
            h5: Boolean,
            h6: Boolean
        },

        methods:{

            goAnchor() {

                let anchor = this.$el.querySelector('#'+this.id);

                window.scroll(0,anchor.offsetTop);

                this.$router.replace({path:this.$route.path, query: {anchor:this.id}});

            }
        }

    }
</script>