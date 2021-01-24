<template>
    <div>
        <h2>Column width</h2>
        <Explain />
        <NoWidth />
        <PercentWidth />
        <PxWidth />
        <FixedWidth />
    </div>
</template>
<script>
import Explain from "./explain.md";
import NoWidth from "./no-width.md";
import PercentWidth from "./percent-width.md";
import PxWidth from "./px-width.md";
import FixedWidth from "./fixed-width.md";

export default {
    name: "basic-main",
    components: {
        Explain,
        NoWidth,
        PercentWidth,
        PxWidth,
        FixedWidth
    }
};
</script>
