<template>
    <div>
        <h2>Header Fixed</h2>
        <Explain />
        <Base />
        <AutoHeight />
        <HeaderFixedDisabled />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";
import AutoHeight from "./auto-height.md";
import HeaderFixedDisabled from "./header-fixed-disabled.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        Base,
        AutoHeight,
        HeaderFixedDisabled
    }
};
</script>
