<template>
    <div>
        <h2>表格宽度</h2>
        <Explain />
        <AutoWidth />
        <FixedWidth />
        <CalcWidth />
        <PercentWidth />
    </div>
</template>
<script>
import Explain from "./explain.md";
import AutoWidth from "./auto-width.md";
import FixedWidth from "./fixed-width.md";
import CalcWidth from "./calc-width.md";
import PercentWidth from "./percent-width.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        AutoWidth,
        FixedWidth,
        CalcWidth,
        PercentWidth,
    },
};
</script>
