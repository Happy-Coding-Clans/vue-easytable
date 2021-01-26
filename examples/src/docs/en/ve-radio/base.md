:::demo 单选功能

```html
<template>
  <div>
    <div>
      <div class="bold">单选</div>
      <ve-radio @on-radio-change="radioChange" v-model="radioVal">Radio</ve-radio>
      <div>{{radioVal}}</div>
    </div>

    <div>
      <div class="bold">单选禁用</div>
      <ve-radio disabled v-model="radioVal2">Radio</ve-radio>
      <div>{{radioVal2}}</div>
    </div>

    <div>
      <div class="bold">单选禁用</div>
      <ve-radio disabled v-model="radioVal3">Radio</ve-radio>
      <div>{{radioVal3}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        radioVal: false,
        radioVal2: false,
        radioVal3: true,
      };
    },
    methods: {
      radioChange(val) {
        console.log("radioChange::", val);
      },
    },
  };
</script>
```

:::
