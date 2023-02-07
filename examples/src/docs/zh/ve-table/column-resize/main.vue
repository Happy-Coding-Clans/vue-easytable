<template>
    <div>
        <h2>列宽拖动</h2>
        <Explain />
        <Basic />
        <DisableResizing />
        <API title="API" anchor="API" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Basic from "./basic.md";
import DisableResizing from "./disable-resizing.md";
import API from "../api/column-width-resize-option-props";

export default {
    name: "basic-main",
    components: {
        Explain,
        Basic,
        DisableResizing,
        API,
    },
};
</script>
