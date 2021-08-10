<template>
    <div>
        <h2>单元格对齐</h2>
        <Explain />
        <BasicAlign />
    </div>
</template>
<script>
import Explain from "./explain.md";
import BasicAlign from "./basic-align.md";

export default {
    name: "cell-align",
    components: {
        Explain,
        BasicAlign,
    },
};
</script>
