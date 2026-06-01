"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Definition;
        (function (Definition) {
            let Console;
            (function (Console) {
                let Color;
                (function (Color) {
                    Color[Color["GREEN"] = 10] = "GREEN";
                    Color[Color["CYAN"] = 11] = "CYAN";
                    Color[Color["RED"] = 12] = "RED";
                    Color[Color["YELLOW"] = 14] = "YELLOW";
                    Color[Color["DEFAULT"] = 7] = "DEFAULT";
                })(Color = Console.Color || (Console.Color = {}));
            })(Console = Definition.Console || (Definition.Console = {}));
            let Zlib;
            (function (Zlib) {
                let Level;
                (function (Level) {
                    Level[Level["DEFAULT"] = -1] = "DEFAULT";
                    Level[Level["LEVEL_0"] = 0] = "LEVEL_0";
                    Level[Level["LEVEL_1"] = 1] = "LEVEL_1";
                    Level[Level["LEVEL_2"] = 2] = "LEVEL_2";
                    Level[Level["LEVEL_3"] = 3] = "LEVEL_3";
                    Level[Level["LEVEL_4"] = 4] = "LEVEL_4";
                    Level[Level["LEVEL_5"] = 5] = "LEVEL_5";
                    Level[Level["LEVEL_6"] = 6] = "LEVEL_6";
                    Level[Level["LEVEL_7"] = 7] = "LEVEL_7";
                    Level[Level["LEVEL_8"] = 8] = "LEVEL_8";
                    Level[Level["LEVEL_9"] = 9] = "LEVEL_9";
                })(Level = Zlib.Level || (Zlib.Level = {}));
            })(Zlib = Definition.Zlib || (Definition.Zlib = {}));
        })(Definition = Script.Definition || (Script.Definition = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
