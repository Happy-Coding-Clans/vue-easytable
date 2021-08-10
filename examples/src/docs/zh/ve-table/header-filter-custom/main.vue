<template>
    <div>
        <h2>筛选自定义</h2>
        <Explain />
        <SingleFilter />
        <CustomIcon />
        <API title="API" anchor="API" desc="filterCustom 自定义筛选配置" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import SingleFilter from "./single-filter.md";
import CustomIcon from "./custom-icon.md";
import API from "../api/column-props/filter-custom-props.vue";

export default {
    name: "basic-main",
    components: {
        Explain,
        SingleFilter,
        CustomIcon,
        API,
    },
};
</script>
