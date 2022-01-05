<template>
    <div>
        <h2>Contextmenu 右键菜单</h2>
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
