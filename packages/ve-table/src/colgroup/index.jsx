import { getValByUnit } from "../../../src/utils/index.js";
import { COMPS_NAME } from "../util/constant";
export default {
    name: COMPS_NAME.VE_TABLE_COLGROUP,
    props: {
        colgroups: {
            type: Array,
            required: true,
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
                                width: getValByUnit(item._realTimeWidth),
                            }}
                        />
                    );
                })}
            </colgroup>
        );
    },
};
