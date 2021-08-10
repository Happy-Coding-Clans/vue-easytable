<template>
    <div>
        <h2>Icon 图标</h2>
        <Explain />
        <Usage />
        <Base />
        <Collection />
        <API />
    </div>
</template>

<script>
import Explain from "./explain.md";
import Usage from "./usage.md";
import Base from "./base.md";
import Collection from "./collection.vue";
import API from "./api.md";

export default {
    components: {
        Explain,
        Usage,
        Base,
        Collection,
        API,
    },
};
</script>
