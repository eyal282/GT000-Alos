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
                    var ResInfo;
                    (function (ResInfo) {
                        var Merge;
                        (function (Merge) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.res_info.merge",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.res_info.merge.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, true);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", Sen.Kernel.Path.except_extension(argument.source));
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.ResInfo.merge_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, true);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["directory", /.*\.info$/i],
                                    option: 48n,
                                });
                                return;
                            }
                            Merge.forward = forward;
                        })(Merge = ResInfo.Merge || (ResInfo.Merge = {}));
                    })(ResInfo = PopCap.ResInfo || (PopCap.ResInfo = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.ResInfo.Merge.forward();
