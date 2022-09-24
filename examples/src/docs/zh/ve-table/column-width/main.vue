<template>
    <div>
        <h2>列宽设置</h2>
        <Explain />
        <PxWidth />
    </div>
</template>
<script>
import Explain from "./explain.md";
import PxWidth from "./px-width.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        PxWidth,
    },
};
</script>
