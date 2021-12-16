<template>
    <div>
        <h2>Cell Selection</h2>
        <Explain />
        <ShortCuts />
        <Base />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";
import ShortCuts from "./shortcuts.md";

export default {
    name: "cell-selection",
    components: {
        Explain,
        Base,
        ShortCuts,
    },
};
</script>
