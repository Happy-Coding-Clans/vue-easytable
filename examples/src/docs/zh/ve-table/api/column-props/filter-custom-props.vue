<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.columns.filterCustomProps.data"
            :columns="db.columns.filterCustomProps.columns"
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
            default: "筛选自定义"
        },
        desc: {
            type: String,
            default: "filterCustom"
        }
    },
    data() {
        return {
            db: db
        };
    }
};
</script>
