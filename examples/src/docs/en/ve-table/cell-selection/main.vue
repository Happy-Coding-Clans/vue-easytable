<template>
    <div>
        <h2>Cell Selection</h2>
        <Explain />
        <Base />
    </div>
</template>
<script>
import Explain from "./explain.md";
import Base from "./base.md";

export default {
    name: "cell-selection",
    components: {
        Explain,
        Base,
    },
};
</script>
