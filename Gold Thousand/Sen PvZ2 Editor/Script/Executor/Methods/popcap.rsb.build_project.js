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
                        var BuildProject;
                        (function (BuildProject) {
                            function load_packages(source, packages_info) {
                                const packages_setting = {
                                    rton_count: 0n,
                                    json_count: 0n,
                                    key: "",
                                    iv: "",
                                };
                                if (packages_info !== null) {
                                    const packages_list = Sen.Kernel.FileSystem.read_directory(`${source}/packages`);
                                    if (packages_info.encode) {
                                        const json_file_list = new Set();
                                        for (let element of packages_list) {
                                            const currentElement = element.slice(0, element.length - 5);
                                            if (Sen.Kernel.Path.extname(element).toLowerCase() === ".json") {
                                                json_file_list.add(currentElement);
                                                ++packages_setting.json_count;
                                            }
                                            if (Sen.Kernel.Path.extname(element).toLowerCase() === ".rton") {
                                                const hasValue = json_file_list.has(currentElement);
                                                if (hasValue) {
                                                    json_file_list.delete(currentElement);
                                                }
                                                ++packages_setting.rton_count;
                                            }
                                        }
                                        packages_setting.rton_count += BigInt(json_file_list.size);
                                    }
                                    else {
                                        for (let element of packages_list) {
                                            if (Sen.Kernel.Path.extname(element).toLowerCase() === ".rton") {
                                                ++packages_setting.rton_count;
                                            }
                                        }
                                    }
                                }
                                return packages_setting;
                            }
                            BuildProject.load_packages = load_packages;
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.rsb.build_project",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.rsb.build_project.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, true);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", Sen.Kernel.Path.except_extension(argument.source));
                                        Script.Console.output(argument.destination);
                                        Executor.load_bigint(argument, "generic", this.configuration, Script.Executor.Methods.PopCap.RSB.InitProject.Detail.generic(), Sen.Kernel.Language.get("popcap.rsb.custom.generic"));
                                        const packages_info = Sen.Kernel.JSON.deserialize_fs(`${argument.source}/data.json`).packages_info;
                                        const packages_setting = load_packages(argument.source, packages_info);
                                        if (packages_info !== null) {
                                            if (packages_setting.json_count !== 0n && packages_info.encode) {
                                                Script.Console.output(`${Sen.Kernel.Language.get("popcap.rsb.build_project.total_json_count")}: ${packages_setting.json_count}`);
                                                if (packages_setting.json_count !== 0n && packages_info.chinese) {
                                                    Executor.load_string(argument, "key", this.configuration.packages_setting, Sen.Kernel.Language.get("popcap.rsb.build_project.key"));
                                                    Executor.load_string(argument, "iv", this.configuration.packages_setting, Sen.Kernel.Language.get("popcap.rsb.build_project.iv"));
                                                    packages_setting.key = argument.key;
                                                    packages_setting.iv = argument.iv;
                                                }
                                            }
                                            Script.Console.output(`${Sen.Kernel.Language.get("popcap.rsb.build_project.total_rton_count")}: ${packages_setting.rton_count}`);
                                        }
                                        else {
                                            Script.Console.output(Sen.Kernel.Language.get("popcap.rsb.build_project.packages_does_not_use"));
                                        }
                                        const setting = {
                                            texture_format_category: argument.generic,
                                            only_high_resolution: false,
                                            packages_setting,
                                            unpack_packages: true,
                                        };
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.Miscellaneous.Custom.ResourceStreamBundle.pack_fs(argument.source, argument.destination, setting);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward: undefined,
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["directory", /(.*)\.bundle$/i],
                                    option: 55n,
                                });
                                return;
                            }
                            BuildProject.forward = forward;
                        })(BuildProject = RSB.BuildProject || (RSB.BuildProject = {}));
                    })(RSB = PopCap.RSB || (PopCap.RSB = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RSB.BuildProject.forward();
