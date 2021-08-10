<template>
    <div>
        <h2>Sort</h2>
        <Explain />
        <SingleSort />
        <MultiSort />
        <SortAlways />
        <API title="API" anchor="API" desc="sortOption Sort configuration" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import SingleSort from "./single-sort.md";
import MultiSort from "./multi-sort.md";
import SortAlways from "./sort-always.md";
import API from "../api/sort-option-props";

export default {
    name: "basic-main",
    components: {
        Explain,
        SingleSort,
        MultiSort,
        SortAlways,
        API,
    },
};
</script>
