<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.rowStyleOption.data"
            :columns="db.rowStyleOption.columns"
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
            default: "行样式配置"
        },
        desc: {
            type: String,
            default: "rowStyleOption"
        }
    },
    data() {
        return {
            db: db
        };
    }
};
</script>
