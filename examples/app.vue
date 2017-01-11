<template>
    <div>
        <section class="leftMenu">
            <ul>
                <li>
                    <router-link to="/basic">基本表格</router-link>
                </li>
                <li>
                    <router-link to="/custom_columns">自定义列</router-link>
                </li>
                <li>
                    <router-link to="/custom_columns_advanced">自定义列-高级</router-link>
                </li>
                <li>
                    <router-link to="/sort_by_multiple_columns">多条件排序</router-link>
                </li>
                <li>
                    <router-link to="/sort_by_single_columns">单条件排序</router-link>
                </li>
                <li>
                    <router-link to="/frozen_title_columns">固定表列、表头</router-link>
                </li>
                <li>
                    <router-link to="/frozen_title_columns_advanced">列表头、列固定高级用法</router-link>
                </li>
                <li>
                    <router-link to="/complex_title">复杂表头</router-link>
                </li>
            </ul>
        </section>

        <!--主体内容 Start-->
        <main class="container">
            <router-view></router-view>
        </main>
        <!--主体内容 End-->
    </div>
</template>

<style>

    .easytable-class{
        font-size: 14px;
        font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif;
    }

    .easytable-title-class{

        font-weight: bold;
        color: rgb(31, 45, 61);
    }

    .easytable-body-class{

        color: rgb(31, 45, 61);
    }
</style>

<script>
    export default{

    }
</script>