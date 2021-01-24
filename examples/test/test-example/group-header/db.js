const columns = [
    { field: "col1", title: "col1", width: "150px" },
    {
        title: "col2-col3",
        children: [
            {
                field: "col2",
                title: "col2",
                width: "160px"
            },
            {
                field: "col3",
                title: "col3",
                width: "170px"
            }
        ]
    },
    {
        title: "col4-col5-col6",
        children: [
            {
                field: "col4",
                title: "col4",
                width: "180px"
            },
            {
                title: "col5-col6",
                children: [
                    {
                        field: "col5",
                        title: "col5",
                        width: "190px"
                    },
                    {
                        field: "col6",
                        title: "col6",
                        width: "200px"
                    }
                ]
            }
        ]
    },
    { field: "col7", title: "col7", width: "210px" },
    { field: "col8", title: "col8", width: "220px" }
];

const groupColumns = [
    // width 属性应该不用
    [
        {
            field: "col1",
            title: "col1",
            width: "150px",
            _colSpan: 1,
            _rowSpan: 3
        },
        {
            field: "",
            title: "col2-col3",
            width: "",
            _colSpan: 2,
            _rowSpan: 1
        },
        {
            field: "",
            title: "col4-col5-col6",
            width: "",
            _colSpan: 3,
            _rowSpan: 1
        },
        {
            field: "col7",
            title: "col7",
            width: "210px",
            _colSpan: 1,
            _rowSpan: 3
        },
        {
            field: "col8",
            title: "col8",
            width: "220px",
            _colSpan: 1,
            _rowSpan: 3
        }
    ],
    [
        {
            field: "col2",
            title: "col2",
            width: "160px",
            _colSpan: 1,
            _rowSpan: 2
        },
        {
            field: "col3",
            title: "col3",
            width: "170px",
            _colSpan: 1,
            _rowSpan: 2
        },
        {
            field: "col4",
            title: "col4",
            width: "180px",
            _colSpan: 1,
            _rowSpan: 2
        },
        {
            field: "",
            title: "col5-col6",
            width: "",
            _colSpan: 2,
            _rowSpan: 1
        }
    ],
    [
        {
            field: "col5",
            title: "col5",
            width: "190px",
            _colSpan: 1,
            _rowSpan: 1
        },
        {
            field: "col6",
            title: "col6",
            width: "200px",
            _colSpan: 1,
            _rowSpan: 1
        }
    ]
];
