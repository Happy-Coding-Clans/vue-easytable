<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.clipboardOption.data"
            :columns="db.clipboardOption.columns"
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
            default: "Clipboard option",
        },
        desc: {
            type: String,
            default: "clipboardOption",
        },
    },
    data() {
        return {
            db: db,
        };
    },
};
</script>
