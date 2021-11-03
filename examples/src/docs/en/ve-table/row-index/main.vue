<template>
    <div>
        <h2>Row Index</h2>
        <Explain />
        <Base />
        <Ranking />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";
import Ranking from "./ranking.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        Base,
        Ranking,
    },
};
</script>
