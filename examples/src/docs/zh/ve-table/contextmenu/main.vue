<template>
    <div>
        <h2>右键菜单</h2>
        <Explain />
        <ContextmenuTypes />
        <Base />
        <Custom />
    </div>
</template>
<script>
import Explain from "./explain.md";
import ContextmenuTypes from "./contextmenu-types.md";
import Base from "./base.md";
import Custom from "./custom.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        ContextmenuTypes,
        Base,
        Custom,
    },
};
</script>
