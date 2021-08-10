<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.radioOption.data"
            :columns="db.radioOption.columns"
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
            default: "Row radio configuration",
        },
        desc: {
            type: String,
            default: "radioOption",
        },
    },
    data() {
        return {
            db: db,
        };
    },
};
</script>
