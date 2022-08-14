<template>
    <div>
        <h2>表头隐藏</h2>
        <Explain />
        <Base />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        Base,
    },
};
</script>
