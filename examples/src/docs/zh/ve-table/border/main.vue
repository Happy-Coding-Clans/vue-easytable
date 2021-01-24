<template>
    <div>
        <h2>边框</h2>
        <Explain />
        <DefaultBorder />
        <BorderX />
        <BorderY />
        <BorderAround />
        <BorderAll />
        <AroundX />
        <AroundY />
    </div>
</template>
<script>
import Explain from "./explain.md";
import DefaultBorder from "./default.md";
import BorderX from "./border-x.md";
import BorderY from "./border-y.md";
import BorderAround from "./border-around.md";
import BorderAll from "./border-all.md";
import AroundX from "./around-x.md";
import AroundY from "./around-y.md";
export default {
    name: "border",
    components: {
        Explain,
        DefaultBorder,
        BorderX,
        BorderY,
        BorderAround,
        BorderAll,
        AroundX,
        AroundY
    }
};
</script>
