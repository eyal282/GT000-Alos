"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Helper;
        (function (Helper) {
            var PVZ2;
            (function (PVZ2) {
                var UnpackCustom;
                (function (UnpackCustom) {
                    var RebuildRSB;
                    (function (RebuildRSB) {
                        function load_bigint(rule) {
                            const new_rule = [];
                            rule.forEach(function make_rule(e) {
                                if (Sen.Shell.is_gui()) {
                                    Sen.Kernel.Console.print(`${e[0]}. ${e[2]}`);
                                }
                                else {
                                    Sen.Kernel.Console.print(`    ${e[0]}. ${e[2]}`);
                                }
                                new_rule.push(e[0]);
                            });
                            return rule[Number(Sen.Script.Executor.input_integer(new_rule) - 1n)][1];
                        }
                        RebuildRSB.load_bigint = load_bigint;
                        function process(setting, texture_format_category, resolution_list, source) {
                            const rsb_setting = {
                                texture_format_category,
                                only_high_resolution: false,
                                packages_setting: {
                                    rton_count: 0n,
                                    json_count: 0n,
                                    key: "65bd1b2305f46eb2806b935aab7630bb",
                                    iv: "1b2305f46eb2806b935aab76",
                                },
                                compression_setting: {
                                    manifest: true,
                                    packages: true,
                                },
                                unpack_packages: true,
                            };
                            const scg_setting = {
                                decode_method: setting.decode_method,
                                animation_split_label: false,
                            };
                            if (setting.rebuild_rsb_by_loose_constraints_first) {
                                Sen.Kernel.Support.PopCap.RSB.unpack_cipher(source, `${source}.temp_bundle`);
                                Sen.Kernel.Support.PopCap.RSB.pack_resource(`${source}.temp_bundle`, `${source}.temp.rsb`);
                                source = `${source}.temp.rsb`;
                            }
                            Sen.Kernel.Support.Miscellaneous.Custom.ResourceStreamBundle.unpack_fs(source, `${source}.bundle`, rsb_setting);
                            let error_log = "";
                            for (const element of Sen.Kernel.FileSystem.read_directory_only_file(`${source}.bundle/packet`)) {
                                Script.Console.send(`${Sen.Kernel.Language.get("unpack")}: ${Sen.Kernel.Path.basename(element)}`);
                                try {
                                    const composite = Sen.Kernel.Support.Miscellaneous.Custom.StreamCompressedGroup.check_scg_composite(element);
                                    const scg_dest = `${source}.bundle/packet/${Sen.Kernel.Path.base_without_extension(element)}.package`;
                                    Sen.Kernel.Support.Miscellaneous.Custom.StreamCompressedGroup.decode_fs(element, scg_dest, scg_setting);
                                    if (composite) {
                                        const data_info = Sen.Kernel.JSON.deserialize_fs(`${scg_dest}/data.json`);
                                        for (let resolution of resolution_list) {
                                            if (!data_info["category"]["resolution"].includes(resolution)) {
                                                data_info["category"]["resolution"].push(resolution);
                                            }
                                        }
                                        Sen.Kernel.JSON.serialize_fs(`${scg_dest}/data.json`, data_info, 1, true);
                                    }
                                }
                                catch (e) {
                                    Script.Console.warning(e);
                                    error_log += `● ${Sen.Kernel.Language.get("unpack")}: ${Sen.Kernel.Path.basename(element)} | Catch: ${e}\n`;
                                }
                            }
                            for (const element of Sen.Kernel.FileSystem.read_directory_only_directory(`${source}.bundle/packet`)) {
                                try {
                                    Script.Console.send(`${Sen.Kernel.Language.get("pack")}: ${Sen.Kernel.Path.basename(element)}`);
                                    Sen.Kernel.Support.Miscellaneous.Custom.StreamCompressedGroup.encode_fs(element, `${source}.bundle/packet/${Sen.Kernel.Path.base_without_extension(element)}.scg`, scg_setting);
                                }
                                catch (e) {
                                    Script.Console.warning(e);
                                    error_log += `● ${Sen.Kernel.Language.get("pack")}: ${Sen.Kernel.Path.basename(element)} | Catch: ${e}\n`;
                                }
                            }
                            const packages_info = Sen.Kernel.JSON.deserialize_fs(`${source}.bundle/data.json`).packages_info;
                            const packages_setting = Sen.Script.Executor.Methods.PopCap.RSB.BuildProject.load_packages(`${source}.bundle`, packages_info);
                            rsb_setting.packages_setting.json_count = packages_setting.json_count;
                            rsb_setting.packages_setting.rton_count = packages_setting.rton_count;
                            const destination = source.replace(Sen.Kernel.Path.extname(source), `_rebuild${Sen.Kernel.Path.extname(source)}`);
                            Sen.Kernel.Support.Miscellaneous.Custom.ResourceStreamBundle.pack_fs(`${source}.bundle`, destination, rsb_setting);
                            if (error_log.length !== 0) {
                                Sen.Kernel.FileSystem.write_file(`${Sen.Kernel.Path.dirname(source)}/error_log.txt`, error_log);
                            }
                            return;
                        }
                        RebuildRSB.process = process;
                        function execute() {
                            const setting = {
                                rebuild_rsb_by_loose_constraints_first: false,
                                decode_method: 1n,
                            };
                            const source = Script.Console.path(Sen.Kernel.Language.get("script.unpack_custom.rebuild_rsb.source_file"), "file");
                            const generic = Sen.Script.Executor.Methods.PopCap.RSB.InitProject.Detail.generic();
                            Script.Console.argument(Sen.Kernel.Language.get("popcap.rsb.custom.generic"));
                            const input_generic = load_bigint(generic);
                            const resolution_list = [];
                            if (input_generic != 2n) {
                                const resolution = [
                                    [1n, 0n, Sen.Kernel.Language.get("script.unpack_custom.resolution.finish")],
                                    [2n, 768n, Sen.Kernel.Language.get("script.unpack_custom.resolution.768n")],
                                    [3n, 384n, Sen.Kernel.Language.get("script.unpack_custom.resolution.384n")],
                                ];
                                while (resolution.length > 1) {
                                    Script.Console.argument(Sen.Kernel.Language.get("script.rsb.unpack_custom.resolution"));
                                    const input_resolution = load_bigint(resolution);
                                    if (input_resolution == 0n) {
                                        break;
                                    }
                                    resolution_list.push(input_resolution);
                                    for (let i = 1; i < resolution.length; i++) {
                                        if (resolution[i][1] == input_resolution) {
                                            resolution.splice(i, 1);
                                        }
                                        if (i < resolution.length) {
                                            --resolution[i][0];
                                        }
                                    }
                                }
                            }
                            if (resolution_list.length > 0) {
                                Script.Console.output(`${Sen.Kernel.Language.get("script.rsb.unpack_custom.resolution_additional")}: ${resolution_list.toString()}`);
                            }
                            Script.Console.warning(Sen.Kernel.Language.get("script.unpack_custom.rebuild_rsb.warning"));
                            Sen.Script.Executor.clock.start_safe();
                            process(setting, input_generic, resolution_list, source);
                            Sen.Script.Executor.clock.stop_safe();
                            return;
                        }
                        RebuildRSB.execute = execute;
                    })(RebuildRSB = UnpackCustom.RebuildRSB || (UnpackCustom.RebuildRSB = {}));
                })(UnpackCustom = PVZ2.UnpackCustom || (PVZ2.UnpackCustom = {}));
            })(PVZ2 = Helper.PVZ2 || (Helper.PVZ2 = {}));
        })(Helper = Script.Helper || (Script.Helper = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Helper.PVZ2.UnpackCustom.RebuildRSB.execute();
