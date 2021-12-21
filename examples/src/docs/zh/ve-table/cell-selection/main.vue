<template>
    <div>
        <h2>单元格选择</h2>
        <Explain />
        <ShortCuts />
        <Base />
        <DisableSelection />
    </div>
</template>
<script>
import Explain from "./explain.md";
import ShortCuts from "./shortcuts.md";
import Base from "./base.md";
import DisableSelection from "./disable-selection.md";

export default {
    name: "cell-selection",
    components: {
        Explain,
        ShortCuts,
        Base,
        DisableSelection,
    },
};
</script>
