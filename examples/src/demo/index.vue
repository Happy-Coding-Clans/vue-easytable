<template>
    <div>
        <div class="site-demo-container">
            <NormalDataGrid />
        </div>
    </div>
</template>

<script>
import NormalDataGrid from "./normal-data-grid.vue";
export default {
    name: "demo",
    components: {
        NormalDataGrid,
    },
    data() {
        return {};
    },
};
</script>
<style lang="less">
.site-demo-container {
    display: flex;
    flex-direction: column;
    background: #fff;
    margin-top: 62px;
    padding: 10px;
}
</style>
