<template>
    <div>
        <h2>Contextmenu</h2>
        <Explain />
        <ContextmenuTypes />
        <Base />
        <Custom />
        <API title="API" anchor="API" desc="contextmenuBodyOption" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import ContextmenuTypes from "./contextmenu-types.md";
import Base from "./base.md";
import Custom from "./custom.md";
import API from "../api/contextmenu-body-option-props";

export default {
    name: "basic-main",
    components: {
        Explain,
        ContextmenuTypes,
        Base,
        Custom,
        API,
    },
};
</script>
