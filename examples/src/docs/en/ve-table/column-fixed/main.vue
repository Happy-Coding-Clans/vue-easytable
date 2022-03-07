<template>
    <div>
        <h2>Column fixed</h2>
        <Explain />
        <ColumnFixedLeft />
        <ColumnFixedRight />
        <ColumnFixedLeftRight />
        <ColumnFixedAutoWidth />
    </div>
</template>
<script>
import Explain from "./explain.md";
import ColumnFixedLeft from "./column-fixed-left.md";
import ColumnFixedRight from "./column-fixed-right.md";
import ColumnFixedLeftRight from "./column-fixed-left-right.md";
import ColumnFixedAutoWidth from "./column-fixed-auto-width.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        ColumnFixedLeft,
        ColumnFixedRight,
        ColumnFixedLeftRight,
        ColumnFixedAutoWidth,
    },
};
</script>
