<template>
    <div>
        <h2>单元格编辑</h2>
        <Explain />
        <Base />

        <!-- <API title="API" anchor="API" desc="filterCustom 自定义筛选配置" /> -->
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        Base,
    },
};
</script>
