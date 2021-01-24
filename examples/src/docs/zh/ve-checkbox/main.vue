<template>
    <div>
        <div>
            <anchor label="单选功能" />
            <checkbox-single></checkbox-single>
        </div>
        <div>
            <anchor label="多选功能普通用法" />
            <checkbox-multiple-simple></checkbox-multiple-simple>
        </div>
        <div>
            <anchor label="多选功能高级用法" />
            <checkbox-multiple-advanced></checkbox-multiple-advanced>
        </div>
        <API />
    </div>
</template>

<script>
import checkboxSingle from "./checkbox-single.md";
import checkboxMultipleSimple from "./checkbox-multiple-simple.md";
import checkboxMultipleAdvanced from "./checkbox-multiple-advanced.md";
import API from "./api.md";
export default {
    components: {
        checkboxSingle,
        checkboxMultipleAdvanced,
        checkboxMultipleSimple,
        API
    }
};
</script>
