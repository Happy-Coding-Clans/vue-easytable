<template>
    <div>
        <h2>单元格自动填充</h2>
        <Base />
        <AutofillDirection />
        <API />
    </div>
</template>
<script>
import Base from "./base.md";
import AutofillDirection from "./autofill-direction.md";
import API from "../api/cell-autofill-option-props";

export default {
    name: "cell-selection",
    components: {
        Base,
        AutofillDirection,
        API,
    },
};
</script>
