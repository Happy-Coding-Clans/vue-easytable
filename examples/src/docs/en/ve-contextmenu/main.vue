<template>
    <div>
        <h2>Contextmenu</h2>
        <Usage />
        <Base />
        <Api />
    </div>
</template>

<script>
import Usage from "./usage.md";
import Base from "./base.md";

import Api from "./api.md";

export default {
    components: {
        Usage,
        Base,
        Api,
    },
};
</script>
