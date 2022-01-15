<template>
    <div>
        <h2>Filter Custom</h2>
        <Explain />
        <SingleFilter />
        <CustomIcon />
        <API
            title="API"
            anchor="API"
            desc="filterCustom Custom filter option"
        />
    </div>
</template>
<script>
import Explain from "./explain.md";
import SingleFilter from "./single-filter.md";
import CustomIcon from "./custom-icon.md";
import API from "../api/column-props/filter-custom-props.vue";

export default {
    name: "basic-main",
    components: {
        Explain,
        SingleFilter,
        CustomIcon,
        API,
    },
};
</script>
