<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.columns.data"
            :columns="db.columns.columns"
            :expand-option="expandOption"
        />
    </div>
</template>
<script>
import tpl from "@/comp/api-tpl";
import { db } from "../db";
import EllipsisProps from "./ellipsis-props";
import FilterProps from "./filter-props";
import FilterCustomProps from "./filter-custom-props";
export default {
    components: { tpl },
    props: {
        anchor: {
            type: String,
            default: "Column option",
        },
        desc: {
            type: String,
            default: "Columns",
        },
    },
    data() {
        return {
            db: db,
            expandOption: {
                expandable: ({ row, column, rowIndex }) => {
                    if (![49, 50, 55].includes(row["rowKey"])) {
                        return false;
                    }
                },
                defaultExpandedRowKeys: [],
                render: ({ row, column, rowIndex }) => {
                    if (row["rowKey"] === 49) {
                        return <EllipsisProps />;
                    } else if (row["rowKey"] === 50) {
                        return <FilterProps />;
                    } else if (row["rowKey"] === 55) {
                        return <FilterCustomProps />;
                    }
                },
            },
        };
    },
};
</script>
