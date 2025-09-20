"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Helper;
        (function (Helper) {
            var WWise;
            (function (WWise) {
                var ApplyIDHashTable;
                (function (ApplyIDHashTable) {
                    function execute() {
                        const source = Script.Console.path(Sen.Kernel.Language.get("script.helper.wwise.apply_id_hash_table.input_soundbank_data_path"), "file");
                        const table_source = Script.Console.path(Sen.Kernel.Language.get("script.helper.wwise.apply_id_hash_table.input_id_table_json_path"), "file");
                        const data = Sen.Kernel.JSON.deserialize_fs(source);
                        const table = Sen.Kernel.JSON.deserialize_fs(table_source);
                        if (data["hierarchy"] !== null) {
                            for (let i in data["hierarchy"]) {
                                const e = data["hierarchy"][i];
                                if (table.hasOwnProperty(`${e["id"]}`)) {
                                    data["hierarchy"][i] = {
                                        "#name": table[`${e["id"]}`],
                                        ...e
                                    };
                                }
                            }
                        }
                        Sen.Kernel.JSON.serialize_fs(`${Sen.Kernel.Path.except_extension(source)}.hash.json`, data, 1, true);
                        return;
                    }
                    ApplyIDHashTable.execute = execute;
                })(ApplyIDHashTable = WWise.ApplyIDHashTable || (WWise.ApplyIDHashTable = {}));
            })(WWise = Helper.WWise || (Helper.WWise = {}));
        })(Helper = Script.Helper || (Script.Helper = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Helper.WWise.ApplyIDHashTable.execute();
