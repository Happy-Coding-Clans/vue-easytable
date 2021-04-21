<template>
    <div>
        <h2>空数据</h2>
        <Explain />
        <Basic />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Basic from "./basic.md";

export default {
    name: "data-empty",
    components: {
        Explain,
        Basic
    }
};
</script>
