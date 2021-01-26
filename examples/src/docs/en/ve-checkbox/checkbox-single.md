:::demo 单选功能

```html
<template>
  <div>
    <div>
      <div class="bold">单选</div>
      <ve-checkbox @on-checked-change="checkedChange" v-model="checkboxValue1" label="哈密瓜" />
      <div>{{checkboxValue1}}</div>
    </div>

    <div>
      <div class="bold">
        单选禁用
      </div>
      <ve-checkbox disabled v-model="checkboxValue2">哈密瓜</ve-checkbox>
      <div>{{checkboxValue2}}</div>

      <ve-checkbox disabled v-model="checkboxValue3">哈密瓜</ve-checkbox>
      <div>{{checkboxValue3}}</div>
    </div>

    <div>
      <div class="bold">
        半选状态
      </div>
      <ve-checkbox indeterminate>哈密瓜</ve-checkbox>
    </div>

    <div>
      <div class="bold">
        受控属性
      </div>
      <ve-checkbox isControlled :isSelected="isSelected" @on-checked-change="checkedChangeControl"
        >哈密瓜</ve-checkbox
      >
      <div>{{isSelected}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checkboxValue1: true,
        checkboxValue2: false,
        checkboxValue3: true,
        isSelected: true,
      };
    },
    methods: {
      checkedChange(isChecked) {
        console.log("isChecked::", isChecked);
      },
      checkedChangeControl(isChecked) {
        this.isSelected = isChecked;
      },
    },
  };
</script>
```

:::
