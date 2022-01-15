<template>
    <div>
        <h2>右键菜单</h2>
        <Explain />
        <Base />
        <Custom />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";
import Custom from "./custom.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        Base,
        Custom,
    },
};
</script>
