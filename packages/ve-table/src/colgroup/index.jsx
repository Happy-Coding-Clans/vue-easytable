import { getValByUnit } from "../../../src/utils/index.js";
import { COMPS_NAME } from "../util/constant";
export default {
    name: COMPS_NAME.VE_TABLE_COLGROUP,
    props: {
        colgroups: {
            type: Array,
            required: true,
        },
        enableColumnResize: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        getValByUnit(item) {
            const { enableColumnResize } = this;

            let width;
            // 开启 column resize
            if (enableColumnResize) {
                // 解决使用 _realTimeWidth 在多表头下宽度计算异常的问题
                width = item._realTimeWidth ? item._realTimeWidth : item.width;
            } else {
                width = item.width;
            }
            return getValByUnit(width);
        },
    },
    render() {
        return (
            <colgroup>
                {this.colgroups.map((item) => {
                    return (
                        <col
                            key={item.key}
                            style={{
                                width: this.getValByUnit(item),
                            }}
                        />
                    );
                })}
            </colgroup>
        );
    },
};
