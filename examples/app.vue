<template>
    <div class="main">
        <div class="banner">

        </div>

        <!--左侧菜单-->
        <div class="sidebar">
            <ul class="menu-root">
                <li>
                    <a class="sidebar-link" href="javascript:javascript:void(0);">分页组件</a>
                    <ul class="menu-sub">
                        <li>
                            <router-link to="/pagination" exact>分页</router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <a class="sidebar-link" href="javascript:javascript:void(0);">表格组件</a>
                    <ul class="menu-sub">
                        <li>
                            <router-link to="/basic" exact>基本表格</router-link>
                        </li>
                        <li>
                            <router-link to="/custom_columns" exact>自定义列</router-link>
                        </li>
                        <li>
                            <router-link to="/custom_columns_advanced" exact>自定义列-高级</router-link>
                        </li>
                        <li>
                            <router-link to="/sort_by_multiple_columns" exact>多条件排序</router-link>
                        </li>
                        <li>
                            <router-link to="/sort_by_single_columns" exact>单条件排序</router-link>
                        </li>
                        <li>
                            <router-link to="/frozen_title_columns" exact>固定表列、表头</router-link>
                        </li>
                        <li>
                            <router-link to="/frozen_title_columns_advanced" exact>列表头、列固定高级用法</router-link>
                        </li>
                        <li>
                            <router-link to="/complex_title" exact>复杂表头</router-link>
                        </li>
                    </ul>
                </li>

            </ul>
        </div>

        <!--主体内容 Start-->
        <div class="container">
            <router-view></router-view>
        </div>
        <!--主体内容 End-->
    </div>
</template>

<style>

    .et-class {
        font-size: 14px;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    .et-title-class {

        font-weight: bold;
        color: rgb(31, 45, 61);
    }

    .et-body-class {

        color: rgb(31, 45, 61);
    }
</style>

<script>
    export default{}
</script>