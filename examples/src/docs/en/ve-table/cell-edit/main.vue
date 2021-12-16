<template>
    <div>
        <h2>Cell Edit</h2>
        <Explain />
        <ShortCuts />
        <Base />
        <InstanceMethods />
        <CombineColumnFixed />
        <CombineElementUi />
        <API title="API" anchor="API" desc="eidtOption 单元格编辑配置" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import ShortCuts from "./shortcuts.md";
import Base from "./base.md";
import InstanceMethods from "./instance-method.md";
import CombineColumnFixed from "./combine-column-fixed.md";
import CombineElementUi from "./combine-element-ui.md";
import API from "../api/edit-option-props";

export default {
    name: "basic-main",
    components: {
        Explain,
        ShortCuts,
        Base,
        InstanceMethods,
        CombineColumnFixed,
        CombineElementUi,
        API,
    },
};
</script>
