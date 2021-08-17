<template>
    <div>
        <h2>实例方法</h2>
        <Explain />
        <ScrollTo />
    </div>
</template>
<script>
import Explain from "./explain.md";
import ScrollTo from "./scroll-to.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        ScrollTo,
    },
};
</script>
