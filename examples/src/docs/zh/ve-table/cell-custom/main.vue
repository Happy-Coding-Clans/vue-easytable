<template>
    <div>
        <h2>自定义列</h2>
        <BodyCell />
        <HeaderCell />
        <FooterCell />
        <More />
    </div>
</template>
<script>
import BodyCell from "./body-cell.md";
import HeaderCell from "./header-cell.md";
import FooterCell from "../footer-summary/custom-cell.md";
import More from "./more.md";

export default {
    name: "custom-cell",
    components: {
        BodyCell,
        HeaderCell,
        FooterCell,
        More
    }
};
</script>
