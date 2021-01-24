<template>
    <div>
        <h2>Filter</h2>
        <Explain />
        <SingleFilter />
        <MutilFilter />
        <MixtureFilter />
        <CustomIcon />
        <API title="API" anchor="API" desc="filter" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import SingleFilter from "./single-filter.md";
import MutilFilter from "./mutil-filter.md";
import MixtureFilter from "./mixture-filter.md";
import CustomIcon from "./custom-icon.md";
import API from "../api/column-props/filter-props.vue";

export default {
    name: "basic-main",
    components: {
        Explain,
        SingleFilter,
        MutilFilter,
        MixtureFilter,
        CustomIcon,
        API
    }
};
</script>
