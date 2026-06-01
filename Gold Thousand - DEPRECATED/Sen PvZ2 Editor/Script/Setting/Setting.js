"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Setting;
        (function (Setting) {
            Setting.setting_file = Script.Home.query(`~/Setting/Setting.json`);
            Setting.setting = undefined;
            function load() {
                Setting.setting = Sen.Kernel.JSON.deserialize_fs(Setting.setting_file);
                Sen.Kernel.Language.load_language(Script.Home.query(`~/Setting/Language/${Setting.setting.language}.json`));
                return;
            }
            Setting.load = load;
        })(Setting = Script.Setting || (Script.Setting = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
