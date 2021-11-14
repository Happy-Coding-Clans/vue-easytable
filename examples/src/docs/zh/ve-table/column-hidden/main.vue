<template>
    <div>
        <h2>列隐藏</h2>
        <Explain />
        <Base />
        <InstanceMethods />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";
import InstanceMethods from "./instance-methods.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        Base,
        InstanceMethods,
    },
};
</script>
