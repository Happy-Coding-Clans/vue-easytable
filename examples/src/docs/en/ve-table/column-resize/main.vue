<template>
    <div>
        <h2>Column Resize</h2>
        <Explain />
        <Basic />
        <API title="API" anchor="API" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Basic from "./basic.md";
import API from "../api/column-width-resize-option-props";

export default {
    name: "basic-main",
    components: {
        Explain,
        Basic,
        API,
    },
};
</script>
