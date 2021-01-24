<template>
    <div>
        <h2>Header Grouping</h2>
        <Explain />
        <grouping-header />
        <grouping-header-fixed-column />
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
        GroupingHeaderFixedColumn
    }
};
</script>
