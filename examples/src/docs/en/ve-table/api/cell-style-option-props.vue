<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.cellStyleOption.data"
            :columns="db.cellStyleOption.columns"
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
            default: "Cell style configuration",
        },
        desc: {
            type: String,
            default: "cellStyleOption",
        },
    },
    data() {
        return {
            db: db,
        };
    },
};
</script>
