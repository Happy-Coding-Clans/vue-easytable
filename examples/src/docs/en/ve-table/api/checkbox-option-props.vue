<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.checkboxOption.data"
            :columns="db.checkboxOption.columns"
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
            default: "Row multiple selection configuration",
        },
        desc: {
            type: String,
            default: "checkboxOption",
        },
    },
    data() {
        return {
            db: db,
        };
    },
};
</script>
