// 有csv 根式有很大的局限性，不能合并单元格，目前先不上此功能
function getDownloadUrl(content) {

    const BOM = '\uFEFF';
    // Add BOM to text for open in excel correctly
    if (window.Blob && window.URL && window.URL.createObjectURL) {
        const csvData = new Blob([BOM + content], { type: 'text/csv' });
        return URL.createObjectURL(csvData);
    } else {
        return 'data:attachment/csv;charset=utf-8,' + BOM + encodeURIComponent(content);
    }
}

function getContent(columns,tableData,separator = ',') {

    const newLine = '\r\n';

    let result = [],csvRows=[],_tableData=[];

    if (Array.isArray(columns) && columns.length > 0){

        csvRows = columns.map(x=>{

            return x.title;
        })

        result.push(csvRows.join(separator))
    }

    if (Array.isArray(tableData) && tableData.length > 0){

        tableData.forEach(row=>{

            csvRows = columns.map(col=>{

                if (row[col.field]){

                    return row[col.field];
                }

                return '';
            })

            result.push(csvRows.join(separator))
        })
    }

    return result.join(newLine);
}

const csv = {

    download(fileName,columns,tableData){


        let content = getContent(columns,tableData);

        if (content && content.length > 0){

            const link = document.createElement('a');
            link.download = fileName;
            link.href = getDownloadUrl(content);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }else{

            console.error('vue-easytable::no export data');
        }
    }
}

export default csv;