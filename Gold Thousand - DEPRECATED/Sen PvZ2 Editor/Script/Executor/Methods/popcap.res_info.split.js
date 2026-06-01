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
                        var Split;
                        (function (Split) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.res_info.split",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.res_info.split.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${argument.source}.info`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.ResInfo.split_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.json$/i],
                                    option: 47n,
                                });
                                return;
                            }
                            Split.forward = forward;
                        })(Split = ResInfo.Split || (ResInfo.Split = {}));
                    })(ResInfo = PopCap.ResInfo || (PopCap.ResInfo = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.ResInfo.Split.forward();
