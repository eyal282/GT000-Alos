"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Helper;
        (function (Helper) {
            var Debugger;
            (function (Debugger) {
                var RemoveResolutionRSB;
                (function (RemoveResolutionRSB) {
                    function execute() {
                        const source = Script.Console.path("input_folder", "directory");
                        const destination = `${source}.bin`;
                        const bundle = Sen.Kernel.JSON.deserialize_fs(`${source}/data.json`);
                        for (let [g_id, g_value] of Object.entries(bundle.group)) {
                            if (g_value.composite) {
                                for (let [s_id, s_value] of Object.entries(g_value.subgroup)) {
                                    if (s_id.endsWith("_768")) {
                                        delete bundle.group[g_id].subgroup[s_id];
                                    }
                                    if (s_id.endsWith("_384")) {
                                        delete bundle.group[g_id].subgroup[s_id];
                                    }
                                }
                            }
                        }
                        Sen.Kernel.JSON.serialize_fs(`${source}/data.json`, bundle, 1, true);
                        const mainfest = `${source}/packet/__MANIFESTGROUP__.rsg`;
                        Sen.Kernel.Support.PopCap.RSG.unpack_fs(mainfest, mainfest + ".temp");
                        Sen.Kernel.Support.PopCap.RTON.decode_fs(`${mainfest}.temp/resource/PROPERTIES/RESOURCES.RTON`, `${mainfest}.temp/resource/PROPERTIES/RESOURCES.JSON`);
                        Sen.Kernel.Support.PopCap.ResourceGroup.split_fs(`${mainfest}.temp/resource/PROPERTIES/RESOURCES.JSON`, `${mainfest}.temp/resource/PROPERTIES/RESOURCES.split`);
                        const data = Sen.Kernel.JSON.deserialize_fs(`${mainfest}.temp/resource/PROPERTIES/RESOURCES.split/data.json`);
                        for (let g_id of Object.keys(data)) {
                            if (data[g_id].is_composite) {
                                for (let [s_id, s_value] of Object.entries(data[g_id].subgroups)) {
                                    if (s_id.endsWith("_768")) {
                                        delete data[g_id].subgroups[s_id];
                                    }
                                    if (s_id.endsWith("_384")) {
                                        delete data[g_id].subgroups[s_id];
                                    }
                                }
                            }
                        }
                        Sen.Kernel.JSON.serialize_fs(`${mainfest}.temp/resource/PROPERTIES/RESOURCES.split/data.json`, data, 1, true);
                        Sen.Kernel.Support.PopCap.ResourceGroup.merge_fs(`${mainfest}.temp/resource/PROPERTIES/RESOURCES.split`, `${mainfest}.temp/resource/PROPERTIES/RESOURCES.JSON`);
                        Sen.Kernel.Support.PopCap.RTON.encode_fs(`${mainfest}.temp/resource/PROPERTIES/RESOURCES.JSON`, `${mainfest}.temp/resource/PROPERTIES/RESOURCES.RTON`);
                        Sen.Kernel.Support.PopCap.RSG.pack_fs(mainfest + ".temp", mainfest);
                        return;
                    }
                    RemoveResolutionRSB.execute = execute;
                })(RemoveResolutionRSB = Debugger.RemoveResolutionRSB || (Debugger.RemoveResolutionRSB = {}));
            })(Debugger = Helper.Debugger || (Helper.Debugger = {}));
        })(Helper = Script.Helper || (Script.Helper = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Helper.Debugger.RemoveResolutionRSB.execute();
