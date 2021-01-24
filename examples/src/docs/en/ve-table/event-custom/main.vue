<template>
    <div>
        <h2>Event Custom</h2>
        <Explain />
        <OnBodyRow />
        <OnBodyCell />
        <OnHeaderRow />
        <OnHeaderCell />
        <OnFooterRow />
        <OnFooterCell />
        <API title="API" anchor="API" desc="eventCustomOption configuration" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import OnBodyRow from "./on-body-row.md";
import OnBodyCell from "./on-body-cell.md";
import OnHeaderRow from "./on-header-row.md";
import OnHeaderCell from "./on-header-cell.md";
import OnFooterRow from "../footer-summary/on-footer-row.md";
import OnFooterCell from "../footer-summary/on-footer-cell.md";
import API from "../api/event-custom-option-props.vue";

export default {
    name: "event-custom",
    components: {
        Explain,
        OnBodyRow,
        OnBodyCell,
        OnHeaderRow,
        OnHeaderCell,
        OnFooterRow,
        OnFooterCell,
        API
    }
};
</script>
