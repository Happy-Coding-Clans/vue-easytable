'use strict';

Object.defineProperty(exports, "__esModule", {
            value: true
});
exports.default = {
            data: function data() {

                        return {
                                    skipRenderCells: []
                        };
            },


            methods: {
                        cellMergeInit: function cellMergeInit(rowIndex, field, rowData, isFrozenColumns) {
                                    if (this.skipRenderCells.indexOf(rowIndex + '-' + field) !== -1) {
                                                return false;
                                    }

                                    var setting = this.cellMerge && this.cellMerge(rowIndex, rowData, field);

                                    if (setting && (setting.colSpan && setting.colSpan > 1 || setting.rowSpan && setting.rowSpan > 1)) {

                                                this.setSkipRenderCells(setting.colSpan, setting.rowSpan, rowIndex, field, isFrozenColumns);
                                    }

                                    return true;
                        },
                        setSkipRenderCells: function setSkipRenderCells(colSpan, rowSpan, rowIndex, field, isFrozenColumns) {

                                    var columnsFields = isFrozenColumns ? this.getFrozenColumnsFields : this.getNoFrozenColumnsFields,
                                        skipCell = '',
                                        startPosX = void 0,
                                        endPosX = void 0,
                                        startPosY = void 0,
                                        endPosY = void 0;

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

                                                            if (this.skipRenderCells.indexOf(skipCell) === -1) {

                                                                        this.skipRenderCells.push(skipCell);
                                                            }
                                                }
                                    }
                        },
                        setColRowSpan: function setColRowSpan(rowIndex, field, rowData) {

                                    var result = {
                                                colSpan: '',
                                                rowSpan: ''
                                    },
                                        setting = this.cellMerge && this.cellMerge(rowIndex, rowData, field);

                                    if (setting) {

                                                result = {
                                                            colSpan: setting.colSpan ? setting.colSpan : '',
                                                            rowSpan: setting.rowSpan ? setting.rowSpan : ''
                                                };
                                    }

                                    return result;
                        },
                        isCellMergeRender: function isCellMergeRender(rowIndex, field, rowData) {

                                    var setting = this.cellMerge && this.cellMerge(rowIndex, rowData, field);

                                    if (setting && (setting.colSpan && setting.colSpan > 1 || setting.rowSpan && setting.rowSpan > 1)) {

                                                return true;
                                    }

                                    return false;
                        },
                        getRowHeightByRowSpan: function getRowHeightByRowSpan(rowIndex, field, rowData) {

                                    var setting = this.cellMerge && this.cellMerge(rowIndex, rowData, field);

                                    if (setting && setting.rowSpan && setting.rowSpan > 1) {

                                                return this.rowHeight * setting.rowSpan;
                                    }

                                    return this.rowHeight;
                        },
                        getRowWidthByColSpan: function getRowWidthByColSpan(rowIndex, field, rowData) {

                                    var endPosX = void 0,
                                        startPosX = void 0,
                                        columnsFields = this.getColumnsFields,
                                        setting = this.cellMerge && this.cellMerge(rowIndex, rowData, field),
                                        colSpan = setting.colSpan,
                                        totalWidth = 0;

                                    if (setting && colSpan && colSpan >= 1) {

                                                startPosX = columnsFields.indexOf(field);

                                                endPosX = startPosX + colSpan - 1;

                                                for (var i = startPosX; i <= endPosX; i++) {

                                                            this.internalColumns.forEach(function (x) {

                                                                        if (columnsFields[i] === x.field) {

                                                                                    totalWidth += x.width;
                                                                        }
                                                            });
                                                }
                                    }

                                    return totalWidth;
                        },
                        cellMergeContentType: function cellMergeContentType(rowIndex, field, rowData) {

                                    var result = {
                                                isComponent: false,
                                                isContent: false
                                    };

                                    var setting = this.cellMerge && this.cellMerge(rowIndex, rowData, field);

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

};