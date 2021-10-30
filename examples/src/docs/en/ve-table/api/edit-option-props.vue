<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.editOption.data"
            :columns="db.editOption.columns"
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
            default: "Cell Edit Configuration",
        },
        desc: {
            type: String,
            default: "editOption",
        },
    },
    data() {
        return {
            db: db,
        };
    },
};
</script>
