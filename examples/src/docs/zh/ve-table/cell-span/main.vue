<template>
    <div>
        <h2>单元格合并</h2>
        <Explain />
        <BodyColspan />
        <BodyRowspan />
        <FooterCellSpan />
        <CustomContent />
    </div>
</template>
<script>
import Explain from "./explain.md";
import BodyColspan from "./body-colspan.md";
import BodyRowspan from "./body-rowspan.md";
import FooterCellSpan from "../footer-summary/cell-span.md";
import CustomContent from "./custom-content.md";

export default {
    name: "cell-span",
    components: {
        Explain,
        BodyColspan,
        BodyRowspan,
        FooterCellSpan,
        CustomContent,
    },
};
</script>
