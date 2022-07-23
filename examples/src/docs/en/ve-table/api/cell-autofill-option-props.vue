<template>
    <div>
        <tpl
            :desc="desc"
            :anchor="anchor"
            :table-data="db.cellAutofillOption.data"
            :columns="db.cellAutofillOption.columns"
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
            default: "Cell Autofill Option",
        },
        desc: {
            type: String,
            default: "cellAutofillOption",
        },
    },
    data() {
        return {
            db: db,
        };
    },
};
</script>
