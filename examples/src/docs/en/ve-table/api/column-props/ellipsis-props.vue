<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.columns.ellipsisProps.data"
            :columns="db.columns.ellipsisProps.columns"
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
            default: "Cell ellipsis"
        },
        desc: {
            type: String,
            default: "ellipsis"
        }
    },
    data() {
        return {
            db: db
        };
    }
};
</script>
