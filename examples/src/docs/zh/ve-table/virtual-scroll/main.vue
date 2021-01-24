<template>
    <div>
        <h2>虚拟滚动</h2>
        <Explain />
        <Base />
        <AutoHeight />
        <RowCheckbox />
        <RowRadio />
        <RowExpand />
        <ColumnFixed />
        <FooterSummary />
        <API title="API" anchor="API" desc="virtualScrollOption 虚拟滚动配置" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";
import AutoHeight from "./auto-height.md";
import RowCheckbox from "./row-checkbox.md";
import RowRadio from "./row-radio.md";
import RowExpand from "./row-expand.md";
import FooterSummary from "../footer-summary/virtual-scroll.md";
import ColumnFixed from "./column-fixed.md";
import API from "../api/virtual-scroll-option-props";

export default {
    name: "basic-main",
    components: {
        Explain,
        Base,
        AutoHeight,
        RowCheckbox,
        RowRadio,
        RowExpand,
        ColumnFixed,
        FooterSummary,
        API
    }
};
</script>
