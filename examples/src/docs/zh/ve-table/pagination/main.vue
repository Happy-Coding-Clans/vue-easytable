<template>
    <div>
        <h2>结合分页</h2>
        <Explain />
        <basic />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Basic from "./basic.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        Basic
    }
};
</script>
