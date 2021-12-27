<template>
    <div>
        <h2>右键菜单</h2>
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
