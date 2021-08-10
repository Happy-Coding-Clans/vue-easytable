<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.sortOption.data"
            :columns="db.sortOption.columns"
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
            default: "排序配置",
        },
        desc: {
            type: String,
            default: "sortOption",
        },
    },
    data() {
        return {
            db: db,
        };
    },
};
</script>
