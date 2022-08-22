<template>
    <div>
        <div class="site-demo-container">
            <div class="demo-title">
                <div class="demo-title-text">
                    This is a simple data table display.
                </div>
            </div>
            <NormalDataGrid />
            <div class="demo-title last">
                <div class="demo-title-text">
                    Of course, you can also use it like Excel or Google Sheets .
                </div>
            </div>
            <Spreadsheet />
        </div>
    </div>
</template>

<script>
import NormalDataGrid from "./normal-data-grid.vue";
import Spreadsheet from "./spreadsheet.vue";
export default {
    name: "demo",
    components: {
        NormalDataGrid,
        Spreadsheet,
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
    padding: 10px 0;

    .demo-title {
        display: flex;
        height: 80px;
        align-items: center;
        // background: #1890ffb3;
        font-size: 30px;
        padding: 0 100px;
        font-weight: bold;
        color: #40a0ffc1;

        .demo-title-text {
            border-bottom: double 2px;
            display: inline;
            padding: 8px;
        }

        &.last {
            margin-top: 50px;
        }
    }
}
</style>
