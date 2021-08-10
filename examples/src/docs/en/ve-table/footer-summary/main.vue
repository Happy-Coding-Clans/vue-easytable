<template>
    <div>
        <h2>Footer Summary</h2>
        <Explain />
        <Base />
        <CustomCell />
        <CellStyle />
        <CellSpan />
        <OnFooterRow />
        <OnFooterCell />
        <FooterFixed />
        <FooterColumnFixed />
        <VirtualScroll />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";
import CustomCell from "./custom-cell.md";
import CellStyle from "./cell-style.md";
import CellSpan from "./cell-span.md";
import OnFooterRow from "./on-footer-row.md";
import OnFooterCell from "./on-footer-cell.md";
import FooterFixed from "./footer-fixed.md";
import FooterColumnFixed from "./footer-column-fixed.md";
import VirtualScroll from "./virtual-scroll.md";

export default {
    name: "event-custom",
    components: {
        Explain,
        Base,
        CustomCell,
        CellStyle,
        CellSpan,
        OnFooterRow,
        OnFooterCell,
        FooterFixed,
        FooterColumnFixed,
        VirtualScroll,
    },
};
</script>
