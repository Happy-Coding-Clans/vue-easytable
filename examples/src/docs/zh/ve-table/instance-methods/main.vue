<template>
    <div>
        <h2>实例方法</h2>
        <Explain />
        <ScrollTo />
        <ScrollToColKey />
        <ScrollToRowKey />
        <API title="API" anchor="API" desc="实例方法" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import ScrollTo from "./scroll-to.md";
import ScrollToColKey from "./scroll-to-col-key.md";
import ScrollToRowKey from "./scroll-to-row-key.md";
import API from "../api/instance-methods";

export default {
    name: "basic-main",
    components: {
        Explain,
        ScrollTo,
        ScrollToColKey,
        ScrollToRowKey,
        API,
    },
};
</script>
