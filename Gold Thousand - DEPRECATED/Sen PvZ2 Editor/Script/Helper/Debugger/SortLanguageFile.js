"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Helper;
        (function (Helper) {
            var Debugger;
            (function (Debugger) {
                var SortLanguageFile;
                (function (SortLanguageFile) {
                    function process(source) {
                        const destination = {};
                        const keys = Object.keys(source);
                        keys.sort();
                        keys.forEach((e) => (destination[e] = source[e]));
                        return destination;
                    }
                    SortLanguageFile.process = process;
                    function execute() {
                        const source = Script.Console.path(Sen.Kernel.Language.get("script.sort_language_file.input_language_file"), "file");
                        Sen.Kernel.JSON.serialize_fs(source, process(Sen.Kernel.JSON.deserialize_fs(source)), 1, false);
                        return;
                    }
                    SortLanguageFile.execute = execute;
                })(SortLanguageFile = Debugger.SortLanguageFile || (Debugger.SortLanguageFile = {}));
            })(Debugger = Helper.Debugger || (Helper.Debugger = {}));
        })(Helper = Script.Helper || (Script.Helper = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Helper.Debugger.SortLanguageFile.execute();
