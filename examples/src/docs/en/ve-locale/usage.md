<anchor label="Usage"/>

```javascript
import Vue from "vue";
import { VeLocale } from "vue-easytable";
// import language config
import enUS from "vue-easytable/libs/locale/lang/en-US.js";

VeLocale.use(enUS);
```

<anchor label="Global Usage"/>
Mount the `velocale` component on the prototype of Vue for global call

```javascript
import Vue from "vue";
import { VeLocale } from "vue-easytable";

Vue.prototype.$veLocale = VeLocale;
```

use

```javascript
import enUS from "vue-easytable/libs/locale/lang/en-US.js";
this.$veLocale.use(enUS);
```
