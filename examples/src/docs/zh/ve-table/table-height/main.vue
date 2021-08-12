<template>
    <div>
        <h2>列宽设置</h2>
        <Explain />
        <FixedHeight />
    </div>
</template>
<script>
import Explain from "./explain.md";
import FixedHeight from "./fixed-height.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        FixedHeight,
    },
};
</script>
