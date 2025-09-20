"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Helper;
        (function (Helper) {
            var PvZ2;
            (function (PvZ2) {
                var Permanent;
                (function (Permanent) {
                    var ErasePlantLevels;
                    (function (ErasePlantLevels) {
                        function erase_of(obj) {
                            const keys = Object.keys(obj);
                            keys.forEach((e) => {
                                if (Script.is_actual_object(obj[e])) {
                                    erase_of(obj[e]);
                                }
                                if (Script.is_array(obj[e])) {
                                    obj[e].length = 1;
                                    if (Script.is_actual_object(obj[e][0])) {
                                        erase_of(obj[e][0]);
                                    }
                                }
                            });
                        }
                        ErasePlantLevels.erase_of = erase_of;
                        function process(source, ripe) {
                            const json = Sen.Kernel.JSON.deserialize_fs(source);
                            for (const obj of json.objects) {
                                obj.objdata.LevelCap = 1n;
                                obj.objdata.UsesLeveling = false;
                                erase_of(obj.objdata);
                                obj.objdata.LevelXP = [];
                                obj.objdata.LevelCoins = [];
                            }
                            Sen.Kernel.JSON.serialize_fs(ripe, json, 1, false);
                            return;
                        }
                        ErasePlantLevels.process = process;
                        function execute() {
                            const source = Script.Console.path(Sen.Kernel.Language.get("script.erase_plant_level.source_file"), "file");
                            process(source, source.replace(/((\.json))?$/i, ".patch.json"));
                            return;
                        }
                        ErasePlantLevels.execute = execute;
                    })(ErasePlantLevels = Permanent.ErasePlantLevels || (Permanent.ErasePlantLevels = {}));
                })(Permanent = PvZ2.Permanent || (PvZ2.Permanent = {}));
            })(PvZ2 = Helper.PvZ2 || (Helper.PvZ2 = {}));
        })(Helper = Script.Helper || (Script.Helper = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Helper.PvZ2.Permanent.ErasePlantLevels.execute();
