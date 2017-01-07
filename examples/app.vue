<template>
    <div>
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
        <!--主体内容 Start-->
        <main class="outline" id="container">
            <router-view></router-view>
        </main>
        <!--主体内容 End-->
    </div>
</template>

<script>
    export default{

    }
</script>