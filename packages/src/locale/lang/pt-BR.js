(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("VETable/lang/ptBR", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.VETable = global.VETable || {};
    global.VETable.lang = global.VETable.lang || {};
    global.VETable.lang.enUS = mod.exports.default;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    pagination: {
      goto: "ir para",
      page: "página",
      itemsPerPage: " / página",
      total: function total(_total) {
        return "Total " + _total;
      },
      prev5: "5 Páginas Anteriores",
      next5: "Próximas 5 Páginas"
    },
    table: {
      confirmFilter: "Confirmar",
      resetFilter: "Limpar",
      insertRowAbove: "inserir linha acima",
      insertRowBelow: "inserir linha abaixo",
      removeRow: "remover linhas",
      hideColumn: "ocultar coluna"
    }
  };
  _exports.default = _default;
});
