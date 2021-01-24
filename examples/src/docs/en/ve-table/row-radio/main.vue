<template>
    <div>
        <h2>Row Radio</h2>
        <Explain />
        <Base />
        <RadioColumn />
        <SelectedDefault />
        <SelectedDisable />
        <SelectedControl />
        <SelectedRowClick />
        <API title="API" anchor="API" desc="radioOption configuration" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";
import RadioColumn from "./radio-column.md";
import SelectedDefault from "./selected-default.md";
import SelectedDisable from "./selected-disable.md";
import SelectedControl from "./selected-control.md";
import SelectedRowClick from "./selected-row-click.md";
import API from "../api/radio-option-props";

export default {
    name: "basic-main",
    components: {
        Explain,
        Base,
        RadioColumn,
        SelectedDefault,
        SelectedDisable,
        SelectedControl,
        SelectedRowClick,
        API
    }
};
</script>
