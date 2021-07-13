<template>
    <div>
        <h2>固定表头</h2>
        <Explain />
        <Base />
        <AutoHeight />
        <DynamicHeight />
        <HeaderFixedDisabled />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";
import AutoHeight from "./auto-height.md";
import DynamicHeight from "./dynamic-height.md";
import HeaderFixedDisabled from "./header-fixed-disabled.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        Base,
        AutoHeight,
        DynamicHeight,
        HeaderFixedDisabled
    }
};
</script>
