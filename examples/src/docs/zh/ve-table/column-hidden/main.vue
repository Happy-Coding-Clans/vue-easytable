<template>
    <div>
        <h2>列隐藏</h2>
        <Explain />
        <DefaultHiddenColumnKeys />
        <InstanceMethods />
    </div>
</template>
<script>
import Explain from "./explain.md";
import DefaultHiddenColumnKeys from "./default-hidden-column.md";
import InstanceMethods from "./instance-methods.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        DefaultHiddenColumnKeys,
        InstanceMethods,
    },
};
</script>
