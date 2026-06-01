"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Support;
        (function (Support) {
            var PopCap;
            (function (PopCap) {
                var Atlas;
                (function (Atlas) {
                    var MultiResolution;
                    (function (MultiResolution) {
                        function generator(definition, rule, value) {
                            const new_definition = { ...definition, res: value, groups: {} };
                            const keys = Object.keys(definition.groups);
                            keys.forEach((key) => {
                                new_definition.groups[key] = {
                                    default: {
                                        ...definition.groups[key].default,
                                    },
                                    path: definition.groups[key].path.replace(rule, value),
                                };
                            });
                            return new_definition;
                        }
                        MultiResolution.generator = generator;
                        function make_image(images, destination, percentage, callback) {
                            images.forEach((e) => callback(e, `${destination}/${Sen.Kernel.Path.basename(e)}`, percentage));
                            return;
                        }
                        MultiResolution.make_image = make_image;
                        function resize_fs(images, destination, percentage) {
                            make_image(images, destination, percentage, Sen.Kernel.Image.resize_fs);
                            return;
                        }
                        MultiResolution.resize_fs = resize_fs;
                        function scale_fs(images, destination, percentage) {
                            make_image(images, destination, percentage, Sen.Kernel.Image.scale_fs);
                            return;
                        }
                        MultiResolution.scale_fs = scale_fs;
                        function generalization(source, destination, before, after) {
                            let call = undefined;
                            if (after < before) {
                                call = resize_fs;
                            }
                            else {
                                call = scale_fs;
                            }
                            Sen.Kernel.FileSystem.create_directory(destination);
                            const media = `${destination}/media`;
                            Sen.Kernel.FileSystem.create_directory(media);
                            const definition = generator(Sen.Kernel.JSON.deserialize_fs(`${source}/atlas.json`), new RegExp(`${before}`, "i"), `${after}`);
                            Sen.Kernel.JSON.serialize_fs(`${destination}/atlas.json`, definition, 1, false);
                            call(Sen.Kernel.FileSystem.read_directory_only_file(`${source}/media`).filter((e) => /((\.png))$/i.test(e)), media, Number(after) / Number(before));
                            return;
                        }
                        MultiResolution.generalization = generalization;
                        function process(category, size, detail, callback) {
                            for (const e of category) {
                                if (e.before === e.after) {
                                    callback(e.source, size, detail, e.atlas_destination);
                                    continue;
                                }
                                generalization(e.source, e.destination, BigInt(e.before), BigInt(e.after));
                                const distance = Number(e.after) / Number(e.before);
                                callback(e.destination, { padding: size.padding, width: size.width * distance, height: size.height * distance }, detail, e.atlas_destination);
                            }
                            return;
                        }
                        MultiResolution.process = process;
                        function process_fs(category, size, detail, use_res_info) {
                            let callback = undefined;
                            if (use_res_info) {
                                callback = Atlas.Pack.ResInfo.process_fs;
                            }
                            else {
                                callback = Atlas.Pack.ResourceGroup.process_fs;
                            }
                            process(category, size, detail, callback);
                            return;
                        }
                        MultiResolution.process_fs = process_fs;
                    })(MultiResolution = Atlas.MultiResolution || (Atlas.MultiResolution = {}));
                })(Atlas = PopCap.Atlas || (PopCap.Atlas = {}));
            })(PopCap = Support.PopCap || (Support.PopCap = {}));
        })(Support = Script.Support || (Script.Support = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
