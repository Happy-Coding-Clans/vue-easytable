<template>
    <div class="mb100">
        <h2>API</h2>
        <!-- table props -->
        <TableProps />
        <!-- columns -->
        <ColumnProps />
        <!-- instance methods -->
        <InstanceMethods />
        <!-- cell Span Option -->
        <CellSpanOption />
        <!-- column hidden Option -->
        <ColumnHiddenOption />
        <!-- cell Style Option -->
        <CellStyleOption />
        <!-- Row Style Option -->
        <RowStyleOption />
        <!-- expand Option -->
        <ExpandOption />
        <!-- checkbox Option -->
        <CheckboxOption />
        <!-- radio Option -->
        <RadioOption />
        <!-- virtual Scroll Option -->
        <VirtualScrollOption />
        <!-- sort Option -->
        <SortOption />
        <!-- Cell Selection Option -->
        <CellSelectionOption />
        <!-- edit Option -->
        <EditOption />
        <!-- Event Custom Option -->
        <EventCustomOption />
    </div>
</template>
<script>
import { db } from "./db";
import TableProps from "./table-props";
import ColumnProps from "./column-props";
import InstanceMethods from "./instance-methods";
import ExpandOption from "./expand-option-props";
import CheckboxOption from "./checkbox-option-props";
import RadioOption from "./radio-option-props";
import VirtualScrollOption from "./virtual-scroll-option-props";
import SortOption from "./sort-option-props";
import CellSpanOption from "./cell-span-option-props";
import EventCustomOption from "./event-custom-option-props";
import ColumnHiddenOption from "./column-hidden-option-props";
import CellStyleOption from "./cell-style-option-props";
import RowStyleOption from "./row-style-option-props";
import CellSelectionOption from "./cell-selection-option-props";
import EditOption from "./edit-option-props";
export default {
    components: {
        TableProps,
        ColumnProps,
        InstanceMethods,
        CellSpanOption,
        EventCustomOption,
        ColumnHiddenOption,
        CellStyleOption,
        RowStyleOption,
        ExpandOption,
        CheckboxOption,
        RadioOption,
        VirtualScrollOption,
        SortOption,
        CellSelectionOption,
        EditOption,
    },
    data() {
        return {
            db: db,
        };
    },
};
</script>
