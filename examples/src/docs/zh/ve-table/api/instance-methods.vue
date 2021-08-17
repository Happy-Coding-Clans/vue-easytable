<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.instanceMethods.data"
            :columns="db.instanceMethods.columns"
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
            default: "实例方法",
        },
        desc: {
            type: String,
            default: "Table Instance Methods",
        },
    },
    data() {
        return {
            db: db,
        };
    },
};
</script>
