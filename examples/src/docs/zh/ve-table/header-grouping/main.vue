<template>
    <div>
        <h2>表头分组</h2>
        <Explain />
        <GroupingHeader />
        <GroupingHeaderFixedColumn />
    </div>
</template>
<script>
import Explain from "./explain.md";
import GroupingHeader from "./grouping-header.md";
import GroupingHeaderFixedColumn from "./grouping-header-fixed-column.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        GroupingHeader,
        GroupingHeaderFixedColumn,
    },
};
</script>
