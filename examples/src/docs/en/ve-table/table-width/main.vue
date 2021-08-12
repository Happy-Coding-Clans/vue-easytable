<template>
    <div>
        <h2>Table Width</h2>
        <Explain />
        <FixedWidth />
        <CalcWidth />
        <PercentWidth />
    </div>
</template>
<script>
import Explain from "./explain.md";
import FixedWidth from "./fixed-width.md";
import CalcWidth from "./calc-width.md";
import PercentWidth from "./percent-width.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        FixedWidth,
        CalcWidth,
        PercentWidth,
    },
};
</script>
