<template>
    <anchor label="图标集合" :is-edit="false">
        <div class="icon-container">
            <div
                v-for="iconName in Object.values(this.icons)"
                :key="iconName"
                class="icon-item"
            >
                <div class="icon-item-comp">
                    <ve-icon :name="iconName" />
                </div>
                <span class="icon-name">{{ iconName }}</span>
            </div>
        </div>
    </anchor>
</template>

<script>
export default {
    data() {
        return {
            // icon list
            icons: {
                FILTER: "filter",

                DOUBLE_RIGHT_ARROW: "double-right-arrow",
                DOUBLE_LEFT_ARROW: "double-left-arrow",

                TOP_ARROW: "top-arrow",
                RIGHT_ARROW: "right-arrow",
                BOTTOM_ARROW: "bottom-arrow",
                LEFT_ARROW: "left-arrow",

                SORT_TOP_ARROW: "sort-top-arrow",
                SORT_BOTTOM_ARROW: "sort-bottom-arrow",

                SEARCH: "search",
            },
        };
    },
};
</script>

<style lang="less" scoped>
.icon-container {
    display: flex;
    flex-wrap: wrap;

    .icon-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 150px;
        /* border: 1px solid #eee; */

        .icon-item-comp {
            display: inline-flex;
            align-items: center;
            height: 50px;

            > i {
                font-size: 35px;
            }
        }

        .icon-name {
            display: inline-block;
            height: 30px;
            color: #99a9bf;
        }

        &:hover {
            color: #2196f3;

            .icon-name {
                color: #2196f3;
            }
        }
    }
}
</style>
