<template>
    <div>
        <h2>Cell Selection</h2>
        <Explain />
        <ShortCuts />
        <Base />
        <DisableSelection />
        <SetSelectionInstance />
    </div>
</template>
<script>
import Explain from "./explain.md";
import ShortCuts from "./shortcuts.md";
import Base from "./base.md";
import DisableSelection from "./disable-selection.md";
import SetSelectionInstance from "./set-selection-instance.md";

export default {
    name: "cell-selection",
    components: {
        Explain,
        ShortCuts,
        Base,
        DisableSelection,
        SetSelectionInstance,
    },
};
</script>
