"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Helper;
        (function (Helper) {
            var Debugger;
            (function (Debugger) {
                var CompareLanguageFile;
                (function (CompareLanguageFile) {
                    function process(source, destination) {
                        const missing_key = {};
                        const source_keys = Object.keys(source);
                        const destination_keys = Object.keys(destination);
                        for (const e of source_keys) {
                            if (destination_keys.includes(e)) {
                                continue;
                            }
                            missing_key[e] = source[e];
                        }
                        return missing_key;
                    }
                    CompareLanguageFile.process = process;
                    function execute() {
                        const source = Script.Console.path(Sen.Kernel.Language.get("script.compare_language.input_original_language_file"), "file");
                        const destination = Script.Console.path(Sen.Kernel.Language.get("script.compare_language.input_modified_language_file"), "file");
                        const missing_key = process(Sen.Kernel.JSON.deserialize_fs(source), Sen.Kernel.JSON.deserialize_fs(destination));
                        Object.keys(missing_key).forEach((key) => Script.Console.send(`${Sen.Kernel.Language.get("missing_key")}: ${key}`));
                        return;
                    }
                    CompareLanguageFile.execute = execute;
                })(CompareLanguageFile = Debugger.CompareLanguageFile || (Debugger.CompareLanguageFile = {}));
            })(Debugger = Helper.Debugger || (Helper.Debugger = {}));
        })(Helper = Script.Helper || (Script.Helper = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Helper.Debugger.CompareLanguageFile.execute();
