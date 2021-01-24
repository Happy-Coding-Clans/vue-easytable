<template>
    <div>
        <h2>单元格选择</h2>
        <Explain />
        <Base />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";

export default {
    name: "cell-selection",
    components: {
        Explain,
        Base
    }
};
</script>
