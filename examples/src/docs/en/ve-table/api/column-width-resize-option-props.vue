<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.columnWidthResizeOption.data"
            :columns="db.columnWidthResizeOption.columns"
        />
    </div>
</template>
<script>
import tpl from "@/comp/api-tpl";
import { db } from "./db";
export default {
    components: { tpl },
    props: {
        anchor: {
            type: String,
            default: "Column Resize Option",
        },
        desc: {
            type: String,
            default: "columnWidthResizeOption",
        },
    },
    data() {
        return {
            db: db,
        };
    },
};
</script>
