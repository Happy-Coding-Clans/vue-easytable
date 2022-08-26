<template>
    <div>
        <h2>剪贴板</h2>
        <Explain />
        <ShortCuts />
        <Base />
    </div>
</template>
<script>
import Explain from "./explain.md";
import ShortCuts from "./shortcuts.md";
import Base from "./base.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        ShortCuts,
        Base,
    },
};
</script>
