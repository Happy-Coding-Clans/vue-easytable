<template>
    <div>
        <h2>Combining Pagination</h2>
        <Explain />
        <Basic />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Basic from "./basic.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        Basic,
    },
};
</script>
