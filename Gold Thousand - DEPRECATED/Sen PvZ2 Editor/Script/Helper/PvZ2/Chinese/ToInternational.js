"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Helper;
        (function (Helper) {
            var PvZ2;
            (function (PvZ2) {
                var Chinese;
                (function (Chinese) {
                    var ToInternational;
                    (function (ToInternational) {
                        function execute() {
                            const international_bundle = Script.Console.path(Sen.Kernel.Language.get("script.helper.pvz2.chinese.to_international.input_international_bundle"), "directory");
                            const chinese_bundle = Script.Console.path(Sen.Kernel.Language.get("script.helper.pvz2.chinese.to_international.input_chinese_bundle"), "directory");
                            Script.Console.argument(Sen.Kernel.Language.get("script.helper.pvz2.chinese.to_international.parsing_international_manifest"));
                            const international_data = Sen.Kernel.JSON.deserialize_fs(`${international_bundle}/data.json`);
                            Script.Console.finished(Sen.Kernel.Language.get("script.helper.pvz2.chinese.to_international.done"));
                            Script.Console.argument(Sen.Kernel.Language.get("script.helper.pvz2.chinese.to_international.parsing_chinese_manifest"));
                            const chinese_data = Sen.Kernel.JSON.deserialize_fs(`${chinese_bundle}/data.json`);
                            Script.Console.finished(Sen.Kernel.Language.get("script.helper.pvz2.chinese.to_international.done"));
                            const dummy = chinese_data["packet"];
                            const scg_setting = {
                                decode_method: 0n,
                                animation_split_label: false,
                            };
                            const _handle = () => {
                                const ripe_file = `${chinese_bundle}/group.json`;
                                Sen.Kernel.JSON.serialize_fs(ripe_file, dummy, 1, false);
                                Script.Console.finished(`${Sen.Kernel.Language.get("script.helper.pvz2.chinese.to_international.dumped_file")}: ${ripe_file}`);
                                const international_ripe_file = `${international_bundle}/group.json`;
                                Sen.Kernel.JSON.serialize_fs(international_ripe_file, [], 1, false);
                                Script.Console.finished(`${Sen.Kernel.Language.get("script.helper.pvz2.chinese.to_international.to_port_2c_content_edit_this")}: ${ripe_file}`);
                                Script.Console.argument(Sen.Kernel.Language.get("script.helper.pvz2.chinese.to_international.waiting"));
                                Sen.Kernel.Console.readline();
                                return Sen.Kernel.JSON.deserialize_fs(international_ripe_file);
                            };
                            const list = _handle();
                            for (const e of list) {
                                if (international_data.packet.includes(e)) {
                                    Script.Console.error(Script.format(Sen.Kernel.Language.get("already_exists"), e));
                                    continue;
                                }
                                Script.Console.send(e);
                                const source_directory = `${international_bundle}/packet/${e}.scg.package`;
                                Sen.Kernel.Support.Miscellaneous.Custom.StreamCompressedGroup.decode_fs(`${chinese_bundle}/packet/${e}.scg`, source_directory, scg_setting);
                                const scg_data = Sen.Kernel.JSON.deserialize_fs(`${international_bundle}/packet/${e}.scg.package/data.json`);
                                scg_data["texture_format_category"] = 0n;
                                if (scg_data["composite"] && scg_data["category"] !== null) {
                                    scg_data["category"]["format"] = 0n;
                                }
                                for (const [_, value] of Object.entries(scg_data.subgroup)) {
                                    value.category.compression = 3n;
                                }
                                Sen.Kernel.JSON.serialize_fs(`${source_directory}/data.json`, scg_data, 1, false);
                                Sen.Kernel.Support.Miscellaneous.Custom.StreamCompressedGroup.encode_fs(source_directory, `${international_bundle}/packet/${e}.scg`, scg_setting);
                                international_data.packet.push(e);
                                Sen.Kernel.FileSystem.Operation.remove_all(source_directory);
                            }
                            Script.Console.finished(Sen.Kernel.Language.get("script.helper.pvz2.chinese.to_international.all_process_has_been_finished"));
                            Sen.Kernel.JSON.serialize_fs(`${international_bundle}/data.json`, international_data, 1, false);
                        }
                        ToInternational.execute = execute;
                    })(ToInternational = Chinese.ToInternational || (Chinese.ToInternational = {}));
                })(Chinese = PvZ2.Chinese || (PvZ2.Chinese = {}));
            })(PvZ2 = Helper.PvZ2 || (Helper.PvZ2 = {}));
        })(Helper = Script.Helper || (Script.Helper = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Helper.PvZ2.Chinese.ToInternational.execute();
