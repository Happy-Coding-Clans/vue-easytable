<template>
    <div>
        <h2>列宽拖动</h2>
        <Explain />
        <TableFixedWidth />
    </div>
</template>
<script>
import Explain from "./explain.md";
import TableFixedWidth from "./table-fixed-width.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        TableFixedWidth,
    },
};
</script>
