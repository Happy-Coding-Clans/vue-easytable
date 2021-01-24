<template>
    <div>
        <h2>Loading 加载</h2>
        <Usage />
        <Container />
        <Fullscreen />
        <Custom />
        <Collection />
        <Api />
    </div>
</template>

<script>
import Usage from "./usage.md";
import Container from "./container.md";
import Fullscreen from "./fullscreen.md";
import Custom from "./custom.md";
import Collection from "./collection.vue";
import Api from "./api.md";
export default {
    components: {
        Usage,
        Container,
        Fullscreen,
        Custom,
        Collection,
        Api
    }
};
</script>
