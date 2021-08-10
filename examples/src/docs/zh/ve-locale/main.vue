<template>
    <div>
        <h2>locale 国际化</h2>
        <Usage />
        <SwitchLang />
        <CoverLang />
        <Api />
    </div>
</template>

<script>
import Usage from "./usage.md";
import SwitchLang from "./switch-lang.md";
import CoverLang from "./cover-lang.md";
import Api from "./api.md";

export default {
    components: {
        Usage,
        SwitchLang,
        CoverLang,
        Api,
    },
};
</script>
