<template>
    <div>
        <h2>Table Height</h2>
        <Explain />
        <AutoHeight />
        <FixedHeight />
        <CalcHeight />
    </div>
</template>
<script>
import Explain from "./explain.md";
import AutoHeight from "./auto-height.md";
import FixedHeight from "./fixed-height.md";
import CalcHeight from "./calc-height.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        AutoHeight,
        FixedHeight,
        CalcHeight,
    },
};
</script>
