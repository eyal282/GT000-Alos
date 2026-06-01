"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Helper;
        (function (Helper) {
            var PvZ2;
            (function (PvZ2) {
                var Animation;
                (function (Animation) {
                    var GenerateAtlasFromData;
                    (function (GenerateAtlasFromData) {
                        GenerateAtlasFromData.z_path = ["images", "1536", "full", "worldmap", "lostcity"];
                        GenerateAtlasFromData.allowance = ["1536", "768", "384", "640", "1200"];
                        function process(atlas, record) {
                            const paths = Object.keys(record.image);
                            paths.forEach((path) => {
                                atlas.groups[path] = {
                                    default: {
                                        x: 0n,
                                        y: 0n,
                                    },
                                    path: [...GenerateAtlasFromData.z_path, record.image[path].id].join("/"),
                                };
                            });
                            return;
                        }
                        GenerateAtlasFromData.process = process;
                        function get_resolution() {
                            return GenerateAtlasFromData.allowance.filter((e) => GenerateAtlasFromData.z_path.find((z) => z === e));
                        }
                        GenerateAtlasFromData.get_resolution = get_resolution;
                        function process_fs() {
                            const record = Script.Console.path(Sen.Kernel.Language.get("script.helper.pvz2.animation.generate_atlas_from_data.input_data_json"), "file");
                            Script.Console.send(Sen.Kernel.Language.get("script.helper.pvz2.animation.generate_atlas_from_data.input_subgroup_name"), Script.Definition.Console.Color.CYAN);
                            const subgroup = Sen.Kernel.Console.readline();
                            const resolutions = get_resolution();
                            if (resolutions.length === 0) {
                                throw new Error(Script.format(Sen.Kernel.Language.get("script.helper.pvz2.animation.generate_atlas_from_data.resolution_not_found"), GenerateAtlasFromData.allowance));
                            }
                            const destination = Sen.Kernel.Path.dirname(subgroup);
                            resolutions.forEach(function handle_resolution(resolution) {
                                const atlas = {
                                    expand_path: "array",
                                    method: "id",
                                    trim: false,
                                    subgroup: `${subgroup}_${resolution}`,
                                    res: resolution,
                                    groups: {},
                                };
                                process(atlas, Sen.Kernel.JSON.deserialize_fs(record));
                                Sen.Kernel.JSON.serialize_fs(`${destination}/${subgroup}_${resolution}.json`, atlas, 1, false);
                            });
                            return;
                        }
                        GenerateAtlasFromData.process_fs = process_fs;
                    })(GenerateAtlasFromData = Animation.GenerateAtlasFromData || (Animation.GenerateAtlasFromData = {}));
                })(Animation = PvZ2.Animation || (PvZ2.Animation = {}));
            })(PvZ2 = Helper.PvZ2 || (Helper.PvZ2 = {}));
        })(Helper = Script.Helper || (Script.Helper = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Helper.PvZ2.Animation.GenerateAtlasFromData.process_fs();
