<template>
    <div>
        <h2>Clipboard</h2>
        <Explain />
        <ShortCuts />
        <Base />
        <API title="API" anchor="API" desc="clipboardOption" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import ShortCuts from "./shortcuts.md";
import Base from "./base.md";
import API from "../api/clipboard-option-props";

export default {
    name: "basic-main",
    components: {
        Explain,
        ShortCuts,
        Base,
        API,
    },
};
</script>
