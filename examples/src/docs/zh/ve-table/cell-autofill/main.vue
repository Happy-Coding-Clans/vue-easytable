<template>
    <div>
        <h2>单元格自动填充</h2>
        <Base />
        <AutofillDirection />
    </div>
</template>
<script>
import Base from "./base.md";
import AutofillDirection from "./autofill-direction.md";

export default {
    name: "cell-selection",
    components: {
        Base,
        AutofillDirection,
    },
};
</script>
