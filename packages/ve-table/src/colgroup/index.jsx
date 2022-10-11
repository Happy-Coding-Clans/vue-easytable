import { getValByUnit, isNumber } from "../../../src/utils/index.js";
import { COMPS_NAME } from "../util/constant";
export default {
    name: COMPS_NAME.VE_TABLE_COLGROUP,
    props: {
        colgroups: {
            type: Array,
            required: true,
        },
    },
    methods: {
        getValByUnit(width) {
            if (isNumber(width)) {
                width = Math.floor(width);
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
                                width: this.getValByUnit(item._realTimeWidth),
                            }}
                        />
                    );
                })}
            </colgroup>
        );
    },
};
