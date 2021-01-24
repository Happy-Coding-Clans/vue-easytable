<template>
    <div>
        <h2>行多选</h2>
        <Explain />
        <Base />
        <SelectedColumn />
        <SelectedDefault />
        <SelectedDisable />
        <SelectedControl />
        <SelectedRowClick />
        <SelectedAllHide />
        <API title="API" anchor="API" desc="checkboxOption 行多选配置" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";
import SelectedDefault from "./selected-default.md";
import SelectedColumn from "./selected-column.md";
import SelectedDisable from "./selected-disable.md";
import SelectedControl from "./selected-control.md";
import SelectedRowClick from "./selected-row-click.md";
import SelectedAllHide from "./selected-all-hide.md";
import API from "../api/checkbox-option-props";

export default {
    name: "basic-main",
    components: {
        Explain,
        Base,
        SelectedDefault,
        SelectedColumn,
        SelectedDisable,
        SelectedControl,
        SelectedRowClick,
        SelectedAllHide,
        API
    }
};
</script>
