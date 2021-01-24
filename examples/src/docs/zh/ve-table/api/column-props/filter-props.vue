<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.columns.filterProps.data"
            :columns="db.columns.filterProps.columns"
        />
    </div>
</template>
<script>
import tpl from "@/comp/api-tpl";
import { db } from "../db";
export default {
    components: { tpl },
    props: {
        anchor: {
            type: String,
            default: "筛选"
        },
        desc: {
            type: String,
            default: "filter"
        }
    },
    data() {
        return {
            db: db
        };
    }
};
</script>
