<template>
    <div>
        <h2>行序号</h2>
        <Base />
        <Ranking />
    </div>
</template>
<script>
import Base from "./base.md";
import Ranking from "./ranking.md";

export default {
    name: "basic-main",
    components: {
        Base,
        Ranking,
    },
};
</script>
