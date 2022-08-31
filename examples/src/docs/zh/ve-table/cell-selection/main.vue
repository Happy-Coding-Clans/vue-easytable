<template>
    <div>
        <h2>单元格选择</h2>
        <Explain />
        <ShortCuts />
        <Base />
        <DisableSelection />
        <SetSelectionInstance />
        <SetRangeSelectionInstance />
        <API title="API" anchor="API" desc="cellSelection 单元格选择配置" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import ShortCuts from "./shortcuts.md";
import Base from "./base.md";
import DisableSelection from "./disable-selection.md";
import SetSelectionInstance from "./set-selection-instance.md";
import SetRangeSelectionInstance from "./set-range-selection-instance.md";
import API from "../api/cell-selection-option-props";

export default {
    name: "cell-selection",
    components: {
        Explain,
        ShortCuts,
        Base,
        DisableSelection,
        SetSelectionInstance,
        SetRangeSelectionInstance,
        API,
    },
};
</script>
