<template>
        <ul class="et-page-ul">
            <span class="et-page-total">共 800 条</span>

            <li class="et-page-li et-page-prev"><a><i class="et-icon icon-angle-left"></i></a></li>
            <li class="et-page-li"><a>1</a></li>
            <li class="et-page-li et-page-jump-prev" title="向前 5 页"><a><i class="et-icon icon-angle-double-left"></i></a>
            </li>
            <li class="et-page-li"><a>76</a></li>
            <li class="et-page-li"><a>77</a></li>
            <li class="et-page-li"><a class="is-primary ">78</a></li>
            <li class="et-page-li"><a>79</a></li>
            <li class="et-page-li et-page-jump-next" title="向后 5 页"><a><i class="et-icon icon-angle-double-right"></i></a>
            <li class="et-page-li"><a>80</a></li>
            <li class="et-page-li et-page-next"><a><i class="et-icon icon-angle-right"></i></a></li>

            <v-select class="et-page-select"></v-select>
            <span class="et-page-goto">前往 <input class="et-page-goto-input" type="input"></span> 页
        </ul>
</template>

<script>
    import VSelect from '../../v-select/index'

    export default{
        components:{
            VSelect
        },
        name: 'v-pagination'
    }
</script>