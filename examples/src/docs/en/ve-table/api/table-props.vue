<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.table.data"
            :columns="db.table.columns"
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
            default: "Table configuration"
        },
        desc: {
            type: String,
            default: "Table props"
        }
    },
    data() {
        return {
            db: db
        };
    }
};
</script>
