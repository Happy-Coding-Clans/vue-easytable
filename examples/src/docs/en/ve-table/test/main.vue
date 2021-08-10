<template>
    <div>
        <h2>测试</h2>

        <!--  <div>
            <anchor label="性能测试" />
            <performance />
        </div> -->
        <div>
            <anchor label="性能测试" />
            <performance />
        </div>
    </div>
</template>
<script>
import performance from "./performance.md";

export default {
    name: "test",
    components: {
        performance,
    },
};
</script>
