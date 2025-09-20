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
                        var Convert;
                        (function (Convert) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.res_info.convert",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.res_info.convert.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.dirname(argument.source)}/resources.json`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.ResInfo.convert_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.json$/i],
                                    option: 46n,
                                });
                                return;
                            }
                            Convert.forward = forward;
                        })(Convert = ResInfo.Convert || (ResInfo.Convert = {}));
                    })(ResInfo = PopCap.ResInfo || (PopCap.ResInfo = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.ResInfo.Convert.forward();
