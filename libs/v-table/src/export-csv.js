'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function getDownloadUrl(content) {

    var BOM = '\uFEFF';

    if (window.Blob && window.URL && window.URL.createObjectURL) {
        var csvData = new Blob([BOM + content], { type: 'text/csv' });
        return URL.createObjectURL(csvData);
    } else {
        return 'data:attachment/csv;charset=utf-8,' + BOM + encodeURIComponent(content);
    }
}

function getContent(columns, tableData) {
    var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';


    var newLine = '\r\n';

    var result = [],
        csvRows = [],
        _tableData = [];

    if (Array.isArray(columns) && columns.length > 0) {

        csvRows = columns.map(function (x) {

            return x.title;
        });

        result.push(csvRows.join(separator));
    }

    if (Array.isArray(tableData) && tableData.length > 0) {

        tableData.forEach(function (row) {

            csvRows = columns.map(function (col) {

                if (row[col.field]) {

                    return row[col.field];
                }

                return '';
            });

            result.push(csvRows.join(separator));
        });
    }

    return result.join(newLine);
}

var csv = {
    download: function download(fileName, columns, tableData) {

        var content = getContent(columns, tableData);

        if (content && content.length > 0) {

            var link = document.createElement('a');
            link.download = fileName;
            link.href = getDownloadUrl(content);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {

            console.error('vue-easytable::no export data');
        }
    }
};

exports.default = csv;