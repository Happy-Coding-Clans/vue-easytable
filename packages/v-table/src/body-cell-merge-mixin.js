export default {

    data(){

        return {

            // 跳过渲染的列集合
            skipRenderCells: []
        }

    },

    methods: {

        /*
         * isFrozenColumns:是否是固定列
         * */
        cellMergeInit(rowIndex, field, rowData, isFrozenColumns){

            // 包含在 skipRenderCells 内，则不渲染
            if (this.skipRenderCells.indexOf(rowIndex + '-' + field) !== -1) {
                return false;
            }

            let setting = this.cellMerge && this.cellMerge(rowIndex,rowData,field);

            if (setting && ((setting.colSpan && setting.colSpan > 1) || (setting.rowSpan && setting.rowSpan > 1))) {

                this.setSkipRenderCells(setting.colSpan, setting.rowSpan, rowIndex, field, isFrozenColumns);
            }

            return true;
        },

        // 设置不渲染的列
        setSkipRenderCells(colSpan, rowSpan, rowIndex, field, isFrozenColumns){

            let columnsFields = isFrozenColumns ? this.getFrozenColumnsFields : this.getNoFrozenColumnsFields,
                skipCell = '',
                startPosX, endPosX, startPosY, endPosY;

            endPosX = startPosX = columnsFields.indexOf(field);
            if (colSpan && colSpan > 1) {

                endPosX = startPosX + colSpan - 1;
            }

            endPosY = startPosY = rowIndex;
            if (rowSpan && rowSpan > 1) {

                endPosY = rowIndex + rowSpan - 1;
            }

            for (var posX = startPosX; posX <= endPosX; posX++) {

                for (var posY = startPosY; posY <= endPosY; posY++) {

                    if (posX == startPosX && posY == startPosY) {
                        continue;
                    }

                    skipCell = posY + '-' + columnsFields[posX];

                    // 避免状态改变重新渲染的情况
                    if (this.skipRenderCells.indexOf(skipCell) === -1) {

                        this.skipRenderCells.push(skipCell);
                    }
                }
            }
        },

        // 设置 colSpan
        setColRowSpan(rowIndex, field, rowData){

            let result = {
                    colSpan: '',
                    rowSpan: ''
                },
                setting = this.cellMerge && this.cellMerge(rowIndex,rowData,field);

            if (setting) {

                result = {
                    colSpan: setting.colSpan ? setting.colSpan : '',
                    rowSpan: setting.rowSpan ? setting.rowSpan : ''
                }
            }

            return result;
        },

        /*
         * 并检测不合法的设置，如果设置不合法则不会合并行和列
         * */
        isCellMergeRender(rowIndex, field, rowData){

            let setting = this.cellMerge && this.cellMerge(rowIndex,rowData,field);

            if (setting && ((setting.colSpan && setting.colSpan > 1) || (setting.rowSpan && setting.rowSpan > 1))) {

                return true;
            }

            return false;
        },

        // 获取行高
        getRowHeightByRowSpan(rowIndex, field, rowData){

            let setting = this.cellMerge && this.cellMerge(rowIndex,rowData,field);

            if (setting && (setting.rowSpan && setting.rowSpan > 1)) {

                return this.rowHeight * setting.rowSpan;
            }

            return this.rowHeight;
        },

        /*
         * 获取单元格宽度
         * isFrozenColumns:是否是固定列
         * */
        getRowWidthByColSpan(rowIndex, field, rowData){

            let endPosX,
                startPosX,
                columnsFields = this.getColumnsFields,
                setting = this.cellMerge && this.cellMerge(rowIndex,rowData,field),
                colSpan = setting.colSpan,
                totalWidth = 0;

            if (setting && (colSpan && colSpan >= 1)) {

                startPosX = columnsFields.indexOf(field);

                endPosX = startPosX + colSpan - 1;

                for (var i = startPosX; i <= endPosX; i++) {

                    this.internalColumns.forEach(x => {

                        if (columnsFields[i] === x.field) {

                            totalWidth += x.width;
                        }
                    })
                }
            }

            return totalWidth;
        },

        // 合并的单元格渲染的内容类型
        cellMergeContentType(rowIndex, field, rowData){

            let result = {
                isComponent: false,
                isContent: false
            }

            var setting = this.cellMerge && this.cellMerge(rowIndex,rowData,field);

            if (setting) {

                if (setting.componentName && typeof setting.componentName === 'string' && setting.componentName.length > 0) {

                    result.isComponent = true;

                } else if (setting.content && setting.content.length > 0) {

                    result.isContent = true;
                }
            }

            return result;
        }
    }

}