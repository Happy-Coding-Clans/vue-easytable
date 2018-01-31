:::demo
```html
<template>
         <div class="mt30">
            <h3></h3>

            <div class="mt30">
                <api></api>
            </div>
        </div>
</template>
<script>

    import api from './api.md'

    export default{
        name: "api-main",
        components: {
            api,
        }
    }
</script>
```
:::