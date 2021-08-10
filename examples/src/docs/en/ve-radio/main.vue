<template>
    <div>
        <div>
            <h3>基础功能</h3>
            <Base />
        </div>
        <div>
            <h3>可控属性</h3>
            <Controlled />
        </div>
        <API />
    </div>
</template>

<script>
import Base from "./base.md";
import Controlled from "./controlled.md";
import API from "./api.md";
export default {
    components: {
        Base,
        Controlled,
        API,
    },
};
</script>
