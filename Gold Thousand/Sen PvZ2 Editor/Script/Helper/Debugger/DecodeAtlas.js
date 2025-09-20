"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Helper;
        (function (Helper) {
            var Debugger;
            (function (Debugger) {
                var DecodeAtlas;
                (function (DecodeAtlas) {
                    function execute() {
                        const source = Script.Console.path("input_folder", "directory");
                        const resource_folder = `${source}/resource`;
                        const data_info = Sen.Kernel.JSON.deserialize_fs(`${source}/data.json`);
                        for (let [group_id, group_value] of Object.entries(data_info.group)) {
                            if (group_value.composite) {
                                for (let [subgroup_id, subgroup_value] of Object.entries(group_value.subgroup)) {
                                    if (subgroup_value.category.resolution !== 0) {
                                        for (let resource of subgroup_value.resource) {
                                            if (resource.path.endsWith(".PTX")) {
                                                Script.Console.send(resource.path);
                                                const texture_info = resource.texture_info;
                                                if (texture_info.format == 0) {
                                                    Script.Console.send("RGBA_8888");
                                                    Sen.Kernel.Support.Texture.decode_fs(`${resource_folder}/${resource.path}`, `${resource_folder}/${resource.path.replace(".PTX", ".PNG")}`, BigInt(texture_info.dimension.width), BigInt(texture_info.dimension.height), Sen.Script.Support.Texture.Format.RGBA_8888);
                                                }
                                                if (texture_info.format == 147) {
                                                    Script.Console.send("RGB_ETC1_A_8");
                                                    Sen.Kernel.Support.Texture.decode_fs(`${resource_folder}/${resource.path}`, `${resource_folder}/${resource.path.replace(".PTX", ".PNG")}`, BigInt(texture_info.dimension.width), BigInt(texture_info.dimension.height), Sen.Script.Support.Texture.Format.RGB_ETC1_A_8);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        return;
                    }
                    DecodeAtlas.execute = execute;
                })(DecodeAtlas = Debugger.DecodeAtlas || (Debugger.DecodeAtlas = {}));
            })(Debugger = Helper.Debugger || (Helper.Debugger = {}));
        })(Helper = Script.Helper || (Script.Helper = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Helper.Debugger.DecodeAtlas.execute();
