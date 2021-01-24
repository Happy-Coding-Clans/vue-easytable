<template>
    <div>
        <h2>Pagination</h2>
        <Usage />
        <BaseUsage />
        <PageIndex />
        <PageSize />
        <PagingButtons />
        <PagingConfiguration />
        <CallbackEvents />
        <LayoutSettings />
        <Api />
    </div>
</template>

<script>
import Usage from "./usage.md";
import BaseUsage from "./base-usage.md";
import PageIndex from "./page-index.md";
import PageSize from "./page-size.md";
import PagingButtons from "./paging-buttons.md";
import PagingConfiguration from "./paging-configuration.md";
import CallbackEvents from "./callback-events.md";
import LayoutSettings from "./layout-settings.md";
import Api from "./api.md";

export default {
    components: {
        Usage,
        BaseUsage,
        PageIndex,
        PageSize,
        PagingButtons,
        PagingConfiguration,
        CallbackEvents,
        LayoutSettings,
        Api
    }
};
</script>
