<template>
    <div>
        <h2>单元格编辑</h2>
        <Explain />
        <DoubleClickEdit />
        <!-- <SingleClickEdit />
        <FullRowWidt />
        <EditControl />
        <FullRowEditControl />
        <CustomFullRowEditControl />
        <CombineElementUi /> -->
        <API title="API" anchor="API" desc="eidtOption 单元格编辑配置" />
    </div>
</template>
<script>
import Explain from "./explain.md";
import DoubleClickEdit from "./double-click-edit.md";
// import SingleClickEdit from "./single-click-edit.md";
// import FullRowWidt from "./full-row-edit.md";
// import EditControl from "./edit-control.md";
// import FullRowEditControl from "./full-row-edit-control.md";
// import CustomFullRowEditControl from "./custom-full-row-edit-control.md";
// import CombineElementUi from "./combine-element-ui.md";
import API from "../api/edit-option-props";

export default {
    name: "basic-main",
    components: {
        Explain,
        DoubleClickEdit,
        // SingleClickEdit,
        // FullRowWidt,
        // EditControl,
        // FullRowEditControl,
        // CustomFullRowEditControl,
        // CombineElementUi,
        API,
    },
};
</script>
