<template>
    <div>
        <h2>单元格编辑</h2>
        <Explain />
        <Base />
        <FullRowWidt />

        <!-- <API title="API" anchor="API" desc="filterCustom 自定义筛选配置" /> -->
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";
import FullRowWidt from "./full-row-edit.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        Base,
        FullRowWidt,
    },
};
</script>
