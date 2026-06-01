"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Executor;
        (function (Executor) {
            var Methods;
            (function (Methods) {
                var PopCap;
                (function (PopCap) {
                    var RSB;
                    (function (RSB) {
                        var Trace;
                        (function (Trace) {
                            function current_date() {
                                const date = new Date();
                                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                                const day = date.getDate().toString().padStart(2, "0");
                                const year = date.getFullYear();
                                let hours = date.getHours();
                                const minutes = date.getMinutes().toString().padStart(2, "0");
                                const ampm = hours >= 12 ? "PM" : "AM";
                                hours = hours % 12 || 12;
                                const formattedHours = hours.toString().padStart(2, "0");
                                return `${month}-${day}-${year}-${formattedHours}-${minutes}-${ampm}`;
                            }
                            Trace.current_date = current_date;
                            function backup_content(source, destination) {
                                Sen.Kernel.FileSystem.Operation.copy(Sen.Kernel.Path.normalize(source), Sen.Kernel.Path.normalize(destination));
                            }
                            Trace.backup_content = backup_content;
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.rsb.trace",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.rsb.trace.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, true);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", Sen.Kernel.Path.except_extension(argument.source));
                                        Script.Console.output(argument.destination);
                                        Executor.load_bigint(argument, "generic", this.configuration, Script.Executor.Methods.PopCap.RSB.InitProject.Detail.generic(), Sen.Kernel.Language.get("popcap.rsb.custom.generic"));
                                        const packages_info = Sen.Kernel.JSON.deserialize_fs(`${argument.source}/data.json`).packages_info;
                                        const count_of = () => {
                                            const result = RSB.BuildProject.load_packages(argument.source, packages_info);
                                            if (packages_info !== null) {
                                                if (result.json_count !== 0n && packages_info.encode) {
                                                    Script.Console.output(`${Sen.Kernel.Language.get("popcap.rsb.build_project.total_json_count")}: ${result.json_count}`);
                                                    if (result.json_count !== 0n && packages_info.chinese) {
                                                        Executor.load_string(argument, "key", this.configuration.packages_setting, Sen.Kernel.Language.get("popcap.rsb.build_project.key"));
                                                        Executor.load_string(argument, "iv", this.configuration.packages_setting, Sen.Kernel.Language.get("popcap.rsb.build_project.iv"));
                                                        result.key = argument.key;
                                                        result.iv = argument.iv;
                                                    }
                                                }
                                                Script.Console.output(`${Sen.Kernel.Language.get("popcap.rsb.build_project.total_rton_count")}: ${result.rton_count}`);
                                            }
                                            else {
                                                Script.Console.output(Sen.Kernel.Language.get("popcap.rsb.build_project.packages_does_not_use"));
                                            }
                                            return result;
                                        };
                                        const packages_setting = count_of();
                                        const setting = {
                                            texture_format_category: argument.generic,
                                            only_high_resolution: false,
                                            packages_setting,
                                            unpack_packages: true,
                                        };
                                        Script.Console.warning(Sen.Kernel.Language.get("popcap.rsb.trace.copying_root"));
                                        Sen.Kernel.FileSystem.create_directory(`${argument.source}.repo`);
                                        const repo = {
                                            root: `${argument.source}.repo/root`,
                                            directory: `${argument.source}.repo`,
                                        };
                                        Sen.Kernel.FileSystem.Operation.copy_directory(argument.source, repo.root);
                                        const watcher = new Sen.Kernel.FileWatcher(argument.source);
                                        watcher.on("delete", (e) => {
                                            const timestamp = current_date();
                                            Script.Console.obtained(`${timestamp}: ${Sen.Kernel.Language.get("popcap.rsb.trace.delete")} ${e}`);
                                            Executor.clock.start_safe();
                                            setting.packages_setting = count_of();
                                            const home = `${repo.directory}/${timestamp}`;
                                            Sen.Kernel.FileSystem.create_directory(home);
                                            Sen.Kernel.FileSystem.create_directory(`${home}/${Sen.Kernel.Path.dirname(e)}`);
                                            backup_content(`${repo.root}/${e}`, `${home}/${e}`);
                                            Sen.Kernel.FileSystem.write_file(`${repo.directory}/${timestamp}/change.txt`, `Delete ${e}`);
                                            Sen.Kernel.FileSystem.Operation.remove(Sen.Kernel.Path.normalize(`${repo.root}/${e}`));
                                            if (/(.*)\.scg$/i.test(`${argument.source}/${e}`) || /(.*)\.rton$/i.test(e)) {
                                                Script.Console.output(argument.destination);
                                                Sen.Kernel.Support.Miscellaneous.Custom.ResourceStreamBundle.pack_fs(argument.source, argument.destination, setting);
                                            }
                                            Executor.clock.stop_safe();
                                            Script.Console.send(`${Sen.Kernel.Language.get("elapsed_time")}: ${Executor.clock.duration.toFixed(3)}s`, Script.Definition.Console.Color.GREEN);
                                        });
                                        watcher.on("update", (e) => {
                                            const timestamp = current_date();
                                            Script.Console.obtained(`${timestamp.split("-")}: ${Sen.Kernel.Language.get("popcap.rsb.trace.update")} ${e}`);
                                            Executor.clock.start_safe();
                                            const home = `${repo.directory}/${timestamp}`;
                                            Sen.Kernel.FileSystem.create_directory(home);
                                            backup_content(`${repo.root}/${e}`, `${repo.directory}/${timestamp}/${e}`);
                                            backup_content(`${argument.source}/${e}`, `${repo.root}/${e}`);
                                            Sen.Kernel.FileSystem.write_file(`${repo.directory}/${timestamp}/change.txt`, `Update ${e}`);
                                            if (/(.*)\.scg$/i.test(`${argument.source}/${e}`) || /(.*)\.rton$/i.test(e)) {
                                                Script.Console.output(argument.destination);
                                                Sen.Kernel.Support.Miscellaneous.Custom.ResourceStreamBundle.pack_fs(argument.source, argument.destination, setting);
                                            }
                                            Executor.clock.stop_safe();
                                            Script.Console.send(`${Sen.Kernel.Language.get("elapsed_time")}: ${Executor.clock.duration.toFixed(3)}s`, Script.Definition.Console.Color.GREEN);
                                        });
                                        Script.Console.argument(Script.format(Sen.Kernel.Language.get("popcap.rsb.is_watching"), argument.source));
                                        watcher.start();
                                        return;
                                    },
                                    batch_forward: undefined,
                                    is_enabled: false,
                                    configuration: undefined,
                                    filter: ["directory", /(.*)\.bundle$/i],
                                    option: 61n,
                                });
                                return;
                            }
                            Trace.forward = forward;
                        })(Trace = RSB.Trace || (RSB.Trace = {}));
                    })(RSB = PopCap.RSB || (PopCap.RSB = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RSB.Trace.forward();
