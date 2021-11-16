<template>
    <div>
        <h2>列隐藏</h2>
        <Explain />
        <DefaultHiddenColumnKeys />
        <InstanceMethods />
        <API title="API" anchor="API" desc="columnHidden 列隐藏配置" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import DefaultHiddenColumnKeys from "./default-hidden-column.md";
import InstanceMethods from "./instance-methods.md";
import API from "../api/column-hidden-option-props";

export default {
    name: "basic-main",
    components: {
        Explain,
        DefaultHiddenColumnKeys,
        InstanceMethods,
        API,
    },
};
</script>
