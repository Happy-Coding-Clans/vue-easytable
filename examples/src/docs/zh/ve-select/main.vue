<template>
    <div>
        <Base />
        <API />
    </div>
</template>

<script>
import Base from "./base.md";
import API from "./api.md";
export default {
    components: { Base, API },
    data() {
        return {
            selectItems1: [
                { value: 0, label: "张三" },
                { value: 1, label: "李四" },
                { value: 2, label: "王二" },
            ],

            selectItems2: [
                { value: 0, label: "张三" },
                { value: 1, label: "李四" },
                { value: 2, label: "王二" },
            ],

            selectItems3: [
                { value: 0, label: "张三" },
                { value: 1, label: "李四" },
                { value: 2, label: "王二" },
            ],
        };
    },
};
</script>
