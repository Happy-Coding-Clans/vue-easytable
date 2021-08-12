<template>
    <div>
        <h2>列宽设置</h2>
        <Explain />
        <NoWidth />
    </div>
</template>
<script>
import Explain from "./explain.md";
import NoWidth from "./no-width.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        NoWidth,
    },
};
</script>
