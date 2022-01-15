<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.eventCustomOption.data"
            :columns="db.eventCustomOption.columns"
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
            default: "Event custom option",
        },
        desc: {
            type: String,
            default: "eventCustomOption",
        },
    },
    data() {
        return {
            db: db,
        };
    },
};
</script>
