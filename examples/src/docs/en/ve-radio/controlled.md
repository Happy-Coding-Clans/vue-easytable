:::demo 单选功能

```html
<template>
  <div>
    <div>
      <div class="bold">受控单选</div>
      <button class="button-demo" @click="test()">测试</button><br />
      <ve-radio
        isControlled
        @on-radio-change="radioChange"
        :isSelected="radioVal"
        >Radio</ve-radio
      >
      <div>{{radioVal}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        radioVal: false,
      };
    },
    methods: {
      radioChange(val) {
        this.radioVal = val;
        console.log("radioChange::", val);
      },
      test() {
        this.radioVal = !this.radioVal;
      },
    },
  };
</script>
```

:::
