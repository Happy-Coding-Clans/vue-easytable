<template>
    <div class="et-paging">
        <span class="et-paging-total">共 800 条</span>
        <ul class="et-paging-numbers">
            <li><a><i class="fa fa-angle-left"></i></a></li>
            <li><a>1</a></li>
            <li class="btn-jumper"><a class="is-primary is-inverted "><i class="fa fa-angle-double-left"></i></a>
            </li>
            <li><a>76</a></li>
            <li><a>77</a></li>
            <li><a class="is-primary ">78</a></li>
            <li><a>79</a></li>
            <li class="btn-jumper"><a class="is-primary is-inverted "><i class="fa fa-angle-double-left"></i></a>
            <li><a>80</a></li>
            <li><a><i class="fa fa-angle-right"></i></a></li>
        </ul>
        <span class="paging_select">
                <select>
                    <option value="30">30 条/页</option>
                    <option value="40">40 条/页</option>
                    <option value="50">50 条/页</option>
                </select>
            </span>
        <span class="paging_goto">跳转到 <input type="input" class="input "></span>
    </div>
</template>

<style>
    *, :after, :before {
        box-sizing: border-box;
    }

    .et-paging {
        margin: 0;
        padding: 0;
    }

    .et-paging-total {
        display: inline-block;
        margin: 0 4px;

        background:lightpink;
    }

    .et-paging-numbers {
        display: inline-block;
        margin: 0 4px;

        list-style-type: none;

        background:lightgreen;
    }

    .et-paging-numbers li{
        min-width: 32px;
        line-height: 30px;
        cursor: pointer;
        font-family: Arial;
        transition: all .2s ease-in-out;
        text-align: center;
        float: left;
        list-style: none
    }

    .paging_select {
        display: inline-block;
        margin: 0 4px;
    }

    .paging_goto {
        display: inline-block;
        margin: 0 4px;
    }

</style>

<script>
    export default{
        name: 'v-pagination'
    }
</script>