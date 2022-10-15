<template>
    <div>
        <h2>单元格自动填充</h2>
        <Explain />
        <Base />
        <AutofillDirection />
        <API title="API" anchor="API" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";
import AutofillDirection from "./autofill-direction.md";
import API from "../api/cell-autofill-option-props";

export default {
    name: "cell-selection",
    components: {
        Explain,
        Base,
        AutofillDirection,
        API,
    },
};
</script>
