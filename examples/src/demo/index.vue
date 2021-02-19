<template>
    <div>
        <div class="site-demo-container">
            <div class="operation">
                <div class="operation-item">
                    <el-row :gutter="20">
                        <el-col :span="3">
                            {{ currentLocal["theme"] }}
                            <el-switch
                                v-model="enableDarkTheme"
                                :active-color="switchActiveColor"
                                :inactive-color="switchInactiveColor"
                                @change="switchTheme"
                            >
                            </el-switch>
                        </el-col>

                        <el-col :span="3">
                            {{ currentLocal["columnFixed"] }}
                            <el-switch
                                v-model="enableColumnFixed"
                                :active-color="switchActiveColor"
                                :inactive-color="switchInactiveColor"
                            >
                            </el-switch>
                        </el-col>
                        <el-col :span="3">
                            {{ currentLocal["loading"] }}
                            <el-switch
                                v-model="enableLoading"
                                :active-color="switchActiveColor"
                                :inactive-color="switchInactiveColor"
                                @change="switchLoading"
                            >
                            </el-switch>
                        </el-col>
                        <el-col :span="3">
                            {{ currentLocal["expand"] }}
                            <el-switch
                                v-model="enableExpand"
                                :active-color="switchActiveColor"
                                :inactive-color="switchInactiveColor"
                            >
                            </el-switch>
                        </el-col>
                        <el-col :span="3">
                            {{ currentLocal["radio"] }}
                            <el-switch
                                v-model="enableRowRadio"
                                :active-color="switchActiveColor"
                                :inactive-color="switchInactiveColor"
                            >
                            </el-switch>
                        </el-col>
                        <el-col :span="3">
                            {{ currentLocal["checkbox"] }}
                            <el-switch
                                v-model="enableRowCheckbox"
                                :active-color="switchActiveColor"
                                :inactive-color="switchInactiveColor"
                            >
                            </el-switch>
                        </el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                    </el-row>
                </div>
                <!--   <div class="operation-item">
                    <el-row :gutter="20">
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                    </el-row>
                </div> -->
            </div>

            <ve-table
                id="demo-loading-container"
                fixed-header
                border-y
                :max-height="600"
                :scroll-width="2000"
                :sort-option="sortOption"
                :virtual-scroll-option="virtualScrollOption"
                :columns="columns"
                :table-data="tableData"
                row-key-field-name="rowKey"
                :cell-style-option="cellStyleOption"
                :expand-option="expandOption"
                :radio-option="radioOption"
                :checkbox-optipon="checkboxOptipon"
            />
        </div>
        <!-- <Footer /> -->
    </div>
</template>

<script>
/* import Footer from "@/comp/layout/footer.vue"; */
import Mock from "mockjs";
import locale from "../comp/locale";
import I18nMixins from "../comp/mixins/i18n-mixins";
import ThemeSwitchMixins from "../comp/mixins/theme-switch-mixins.js";
export default {
    components: {
        /* Footer */
    },
    mixins: [I18nMixins, ThemeSwitchMixins],
    data() {
        return {
            switchActiveColor: "#1890ff",
            switchInactiveColor: "rgba(0,0,0,.25)",

            enableDarkTheme: false,
            enableColumnFixed: true,
            enableLoading: false,
            enableExpand: true,
            enableRowRadio: false,
            enableRowCheckbox: false,

            // ---------------table options---------------
            sourceData: [],
            tableData: [],
            startRowIndex: 0,
            // filter condition
            filterConditions: [],
            cellStyleOption: {
                bodyCellClass: ({ row, column, rowIndex }) => {
                    if (column.field === "proficiency") {
                        return "table-body-cell-proficiency";
                    }
                }
            },
            virtualScrollOption: {
                // 是否开启
                enable: true,
                scrolling: this.scrolling
            },
            sortOption: {
                sortChange: params => {
                    this.sortChange(params);
                }
            },
            radioOption: {
                selectedRowChange: ({ row }) => {
                    //console.log(row);
                }
            },
            checkboxOptipon: {
                // row select change event
                selectedRowChange: ({ row, isSelected, selectedRowKeys }) => {
                    //console.log(row, isSelected, selectedRowKeys);
                },
                // selected all change event
                selectedAllChange: ({ isSelected, selectedRowKeys }) => {
                    //console.log(isSelected, selectedRowKeys);
                }
            },
            expandOption: {
                render: ({ row, column, rowIndex }, h) => {
                    return (
                        <p>
                            Hello everyone, My name is{" "}
                            <span style="font-weight:bold;">{row.name}</span>,
                            I'm a {row.profession}.<br /> And I'm living in{" "}
                            {row.address}.
                        </p>
                    );
                }
            }
        };
    },
    computed: {
        // current local
        currentLocal() {
            return locale[this.currentDocLang]["completeDemo"];
        },

        columns() {
            let columns = [];

            if (this.enableRowRadio) {
                columns.push({
                    field: "radio",
                    key: "radio",
                    title: "",
                    width: 30,
                    fixed: this.enableColumnFixed ? "left" : "",
                    type: "radio"
                });
            }

            if (this.enableRowCheckbox) {
                columns.push({
                    field: "checkbox",
                    key: "checkbox",
                    title: "",
                    width: 30,
                    fixed: this.enableColumnFixed ? "left" : "",
                    type: "checkbox"
                });
            }

            if (this.enableExpand) {
                columns.push({
                    field: "expand",
                    key: "expand",
                    title: "",
                    width: 30,
                    fixed: this.enableColumnFixed ? "left" : "",
                    type: "expand"
                });
            }

            columns.push({
                field: "rowIndex",
                key: "a",
                title: "#",
                width: 30,
                fixed: this.enableColumnFixed ? "left" : "",
                renderBodyCell: this.renderRowIndex
            });

            columns = columns.concat([
                {
                    title: "Basic Info",
                    fixed: this.enableColumnFixed ? "left" : "",
                    children: [
                        {
                            field: "name",
                            key: "b",
                            title: "Name",
                            width: 100,
                            align: "left"
                        },
                        {
                            field: "sex",
                            key: "c",
                            title: "Sex",
                            width: 50,
                            align: "center",
                            sortBy: "",
                            renderBodyCell: ({ row, column, rowIndex }, h) => {
                                const cellData = row[column.field];

                                let iconName =
                                    cellData === 1
                                        ? "icon-male"
                                        : "icon-female";

                                return (
                                    <i
                                        style="font-size:20px;color:#666;"
                                        class={"demo-sex iconfont " + iconName}
                                    />
                                );
                            }
                        }
                    ]
                },
                {
                    title: "Personal Experience",
                    align: "center",
                    children: [
                        {
                            title: "Profession",
                            field: "profession",
                            key: "d",
                            width: 100,
                            align: "left"
                        },
                        {
                            title: "IT Skills",
                            children: [
                                {
                                    field: "proficiency",
                                    key: "e",
                                    title: "Proficiency",
                                    width: 150,
                                    sortBy: "",
                                    renderBodyCell: (
                                        { row, column, rowIndex },
                                        h
                                    ) => {
                                        const cellData = row[column.field];

                                        const colorClass =
                                            cellData > 60
                                                ? "demo-blue"
                                                : cellData > 30
                                                ? "demo-orange"
                                                : "demo-red";

                                        return (
                                            <div class="proficiency-span-container">
                                                <span
                                                    class={
                                                        "proficiency-span " +
                                                        colorClass
                                                    }
                                                    style={
                                                        "width:" +
                                                        cellData +
                                                        "%;"
                                                    }
                                                >
                                                    {cellData}%
                                                </span>
                                            </div>
                                        );
                                    }
                                },
                                {
                                    field: "skills",
                                    key: "f",
                                    title: "Skills",
                                    width: 150,
                                    align: "left",
                                    renderBodyCell: (
                                        { row, column, rowIndex },
                                        h
                                    ) => {
                                        const cellData = row[column.field];

                                        const LANGS = [
                                            {
                                                name: "Javascript",
                                                color: "#48a4ef"
                                            },
                                            {
                                                name: "Python",
                                                color: "#d8899c"
                                            },
                                            { name: "java", color: "#a88cd9" }
                                            /* { name: "C++", color: "#88d317" } */
                                        ];

                                        const skills = LANGS.slice(0, cellData);

                                        return skills.map(skill => {
                                            return (
                                                <span
                                                    class="skill-span"
                                                    style={
                                                        "background-color:" +
                                                        skill.color
                                                    }
                                                >
                                                    {skill.name}
                                                </span>
                                            );
                                        });
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    field: "address",
                    key: "g",
                    title: "Address",
                    width: 250,
                    align: "left"
                },
                {
                    field: "status",
                    key: "h",
                    title: "Status",
                    width: 55,
                    fixed: this.enableColumnFixed ? "right" : "",
                    align: "left",
                    // filter
                    filter: {
                        filterList: [
                            { value: 0, label: "Working", selected: false },
                            { value: 1, label: "Metting", selected: false },
                            { value: 2, label: "Traveling", selected: false }
                        ],
                        isMultiple: true,
                        // filter confirm hook
                        filterConfirm: filterList => {
                            const values = filterList
                                .filter(x => x.selected)
                                .map(x => x.value);
                            this.searchByNameField(values);
                        },
                        // filter reset hook
                        filterReset: filterList => {
                            this.searchByNameField([]);
                        }
                        // max height
                        //maxHeight: 120
                    },
                    renderBodyCell: ({ row, column, rowIndex }, h) => {
                        const cellData = row[column.field];

                        const STATUS = [
                            {
                                name: "Working",
                                color: "#48a4ef"
                            },
                            {
                                name: "Meeting",
                                color: "#d8899c"
                            },
                            { name: "Traveling", color: "#a88cd9" }
                        ];

                        const state = STATUS[cellData];

                        return (
                            <span
                                class="status-span"
                                style={"color:" + state.color}
                            >
                                {state.name}
                            </span>
                        );
                    }
                }
            ]);

            return columns;
        }
    },
    methods: {
        // virtual scrolling
        scrolling({
            startRowIndex,
            visibleStartIndex,
            visibleEndIndex,
            visibleAboveCount,
            visibleBelowCount
        }) {
            this.startRowIndex = startRowIndex;
        },

        renderRowIndex({ row, column, rowIndex }) {
            return <span>{rowIndex + this.startRowIndex + 1}</span>;
        },

        // search by name field
        searchByNameField(values) {
            this.filterConditions = values;
            this.filter();
        },

        //
        filter() {
            const values = this.filterConditions;
            this.tableData = this.sourceData
                .slice(0)
                .filter(x => values.length === 0 || values.includes(x.status));
        },

        // sort change
        sortChange(params) {
            const sortFileld1 = "sex";
            const sortFileld2 = "proficiency";

            if (params[sortFileld1] || params[sortFileld2]) {
                this.tableData.sort((a, b) => {
                    if (params[sortFileld1]) {
                        if (params[sortFileld1] === "asc") {
                            return a[sortFileld1] - b[sortFileld1];
                        } else if (params[sortFileld1] === "desc") {
                            return b[sortFileld1] - a[sortFileld1];
                        }
                    } else if (params[sortFileld2]) {
                        if (params[sortFileld2] === "asc") {
                            return a[sortFileld2] - b[sortFileld2];
                        } else if (params[sortFileld2] === "desc") {
                            return b[sortFileld2] - a[sortFileld2];
                        }
                    }
                });
            } else {
                this.resetTableData();
            }
        },

        // switch theme
        switchTheme() {
            this.loadingInstance.show();

            const themeName = this.enableDarkTheme
                ? "theme-dark"
                : "theme-default";

            this.switchThemeMix(themeName).finally(() => {
                this.loadingInstance.close();
            });
        },

        // switch loading
        switchLoading() {
            if (this.enableLoading) {
                this.loadingInstance.show();
            } else {
                this.loadingInstance.close();
            }
        },

        // reset table data
        resetTableData() {
            this.tableData = this.sourceData.slice(0);
            this.filter();
        },

        initSourceData() {
            const PROFESSIONS = [
                "Project Manager",
                "User Interface Designer",
                "Front-End Developer",
                "Testor",
                "Product Designer",
                "System Designer"
            ];

            let data = [];
            for (let i = 0; i < 10000; i++) {
                data.push({
                    rowKey: i,
                    rowIndex: i + 1,
                    name: Mock.Random.name(),
                    sex: Mock.Random.boolean() ? 1 : 2,
                    profession: PROFESSIONS[Mock.Random.natural(0, 5)],
                    proficiency: Mock.Random.natural(5, 85),
                    skills: Mock.Random.natural(0, 3),
                    address: Mock.Random.county(true),
                    status: Mock.Random.natural(0, 2)
                });
            }

            this.sourceData = data;
            this.resetTableData();
        }
    },
    created() {
        this.initSourceData();
    },
    mounted() {
        this.loadingInstance = this.$veLoading({
            target: document.querySelector("#demo-loading-container"),
            // 等同于
            // target:"#loading-container"
            name: "grid"
        });
    },
    destroyed() {
        this.switchThemeMix("theme-default");
    }
};
</script>
<style lang="less">
.site-demo-container {
    background: #fff;
    margin-top: 62px;
    padding: 10px;

    .operation {
        margin: 30px 0;

        .operation-item {
            height: 50px;
        }
    }

    // demo sex field
    .demo-sex {
        &.icon-male {
            color: #91d5ff !important;
        }

        &.icon-female {
            color: #ffadd2 !important;
        }
    }

    // proficiency filed custom cell style
    .table-body-cell-proficiency {
        padding: 0 !important;
    }
    // proficiency filed
    .proficiency-span-container {
        height: 100%;
        text-align: left;
        .proficiency-span {
            height: 100%;
            display: inline-flex;
            align-items: center;
            padding-left: 10px;
            font-weight: bold;
            color: #555;

            &.demo-blue {
                background-color: RGBA(24, 144, 255, 0.7);
            }
            &.demo-orange {
                background-color: RGBA(255, 179, 0, 0.7);
            }
            &.demo-red {
                background-color: RGBA(244, 93, 81, 0.7);
            }
        }
    }

    // skills
    .skill-span {
        display: inline-block;
        margin-right: 5px;
        padding: 3px 8px;
        border-radius: 4px;
        color: #333;
    }
}
</style>
