<template>
    <div>
        <h2>固定表头</h2>
        <Explain />
        <Base />
        <HeaderFixedDisabled />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";
import HeaderFixedDisabled from "./header-fixed-disabled.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        Base,
        HeaderFixedDisabled,
    },
};
</script>
