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
                        var InitProject;
                        (function (InitProject) {
                            let Detail;
                            (function (Detail) {
                                function generic() {
                                    return [
                                        [1n, 0n, Sen.Kernel.Language.get("android")],
                                        [2n, 1n, Sen.Kernel.Language.get("ios")],
                                        [3n, 2n, Sen.Kernel.Language.get("pvz2_android_cn")],
                                    ];
                                }
                                Detail.generic = generic;
                            })(Detail = InitProject.Detail || (InitProject.Detail = {}));
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.rsb.init_project",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.rsb.init_project.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${argument.source}.bundle`);
                                        Script.Console.output(argument.destination);
                                        Executor.load_bigint(argument, "generic", this.configuration, Detail.generic(), Sen.Kernel.Language.get("popcap.rsb.custom.generic"));
                                        Executor.load_boolean(argument, "only_high_resolution", this.configuration, Sen.Kernel.Language.get("popcap.rsb.init_project.only_high_resolution"));
                                        const setting = {
                                            texture_format_category: argument.generic,
                                            only_high_resolution: argument.only_high_resolution,
                                            packages_setting: {
                                                rton_count: 0n,
                                                json_count: 0n,
                                                key: "",
                                                iv: "",
                                            },
                                            unpack_packages: true,
                                        };
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.Miscellaneous.Custom.ResourceStreamBundle.unpack_fs(argument.source, argument.destination, setting);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.*)\.(rsb|obb)$/i],
                                    option: 58n,
                                });
                                return;
                            }
                            InitProject.forward = forward;
                        })(InitProject = RSB.InitProject || (RSB.InitProject = {}));
                    })(RSB = PopCap.RSB || (PopCap.RSB = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RSB.InitProject.forward();
