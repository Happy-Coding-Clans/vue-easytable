<template>
    <div>
        <div class="site-demo-container">
            <ve-table
                fixed-header
                border-y
                :max-height="600"
                :scroll-width="2000"
                :virtual-scroll-option="virtualScrollOption"
                :columns="columns"
                :table-data="tableData"
                row-key-field-name="rowKey"
                :cell-style-option="cellStyleOption"
            />
        </div>
        <!-- <Footer /> -->
    </div>
</template>

<script>
/* import Footer from "@/comp/layout/footer.vue"; */
import Mock from "mockjs";
export default {
    components: {
        /* Footer */
    },
    data() {
        return {
            cellStyleOption: {
                bodyCellClass: ({ row, column, rowIndex }) => {
                    if (column.field === "proficiency") {
                        return "table-body-cell-proficiency";
                    }
                }
            },
            virtualScrollOption: {
                // 是否开启
                enable: true
            },
            columns: [
                {
                    field: "rowIndex",
                    key: "a",
                    title: "#",
                    width: 50,
                    fixed: "left"
                },
                {
                    title: "Basic Info",
                    fixed: "left",
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
                            renderBodyCell: ({ row, column, rowIndex }, h) => {
                                const cellData = row[column.field];

                                let iconName =
                                    cellData === 1
                                        ? "icon-male"
                                        : "icon-female";

                                return (
                                    <i
                                        style="font-size:20px;color:#666;"
                                        class={"iconfont " + iconName}
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
                                            { name: "java", color: "#a88cd9" },
                                            { name: "C++", color: "#88d317" }
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
                    field: "zip",
                    key: "h",
                    title: "Zip",
                    width: 50,
                    fixed: "right"
                }
            ],
            tableData: []
        };
    },
    methods: {
        getRandom(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        initData() {
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
                    skills: Mock.Random.natural(0, 4),
                    address: Mock.Random.county(true),
                    zip: Mock.Random.zip()
                });
            }

            this.tableData = data;
        }
    },
    created() {
        this.initData();
    }
};
</script>
<style lang="less">
.site-demo-container {
    background: #fff;
    margin-top: 62px;
    padding: 10px;

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
        color: #333;
    }
}
</style>
