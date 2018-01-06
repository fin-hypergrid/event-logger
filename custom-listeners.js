'use strict';

function logEventObject(e) {
    this.log(e.type, '::', e);
}

function logDetail(e) {
    this.log(e.type, '::', e.detail);
}

function logScroll(e) {
    this.log(e.type, '::', e.detail.value);
}

function logCell(e) {
    var gCell = e.detail.gridCell;
    var dCell = e.detail.dataCell;
    this.log(e.type, '::',
        'grid-cell:', { x: gCell.x, y: gCell.y },
        'data-cell:', { x: dCell.x, y: dCell.y });
}

function logSelection(e) {
    this.log(e.type, '::', e.detail.rows, e.detail.columns, e.detail.selections);
}

function logRow(e) {
    var rowContext = e.detail.primitiveEvent.dataRow;
    this.log(e.type, '::', 'row-context:', rowContext);
}

module.exports = {
    'fin-cell-enter': logCell,
    'fin-click': logCell,
    'fin-double-click': logRow,
    'fin-selection-changed': logSelection,
    'fin-context-menu': logCell,

    'fin-scroll-x': logScroll,
    'fin-scroll-y': logScroll,

    'fin-row-selection-changed': logDetail,
    'fin-column-selection-changed': logDetail,
    'fin-editor-data-change': logDetail,
    'fin-editor-keyup': logDetail,
    'fin-editor-keypress': logDetail,
    'fin-editor-keydown': logDetail,
    'fin-groups-changed': logDetail,

    'fin-filter-applied': logEventObject,
    'fin-request-cell-edit': logEventObject,
    'fin-before-cell-edit': logEventObject,
    'fin-after-cell-edit': logEventObject
};
