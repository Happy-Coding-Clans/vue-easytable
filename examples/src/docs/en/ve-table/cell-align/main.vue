<template>
    <div>
        <h2>Cell Align</h2>
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
        BasicAlign
    }
};
</script>
