:::demo
```html
<template>
         <div class="mt30">
            <h3>footer 汇总</h3>

            <div class="mt30">
               <anchor id="footer-summary" label="footer 汇总" h4 ></anchor>
               <footer-summary></footer-summary>
           </div>
        </div>
</template>
<script>

    import footerSummary from './footer-summary.md'

    export default{
        name: "footer-summary-main",
        components: {
            footerSummary
        }
    }
</script>
```
:::