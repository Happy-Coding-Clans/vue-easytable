<template>
    <div>
        <h2>单元格编辑</h2>
        <Explain />
        <DoubleClickEdit />
        <SingleClickEdit />
        <FullRowWidt />

        <!-- <API title="API" anchor="API" desc="filterCustom 自定义筛选配置" /> -->
    </div>
</template>
<script>
import Explain from "./explain.md";
import DoubleClickEdit from "./double-click-edit.md";
import SingleClickEdit from "./single-click-edit.md";
import FullRowWidt from "./full-row-edit.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        DoubleClickEdit,
        SingleClickEdit,
        FullRowWidt,
    },
};
</script>
