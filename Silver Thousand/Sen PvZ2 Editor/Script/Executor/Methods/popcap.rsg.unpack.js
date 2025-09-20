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
                    var RSG;
                    (function (RSG) {
                        var Unpack;
                        (function (Unpack) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.rsg.unpack",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.rsg.unpack.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.packet`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.RSG.unpack_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.*)\.rsg$/i],
                                    option: 63n,
                                });
                                return;
                            }
                            Unpack.forward = forward;
                        })(Unpack = RSG.Unpack || (RSG.Unpack = {}));
                    })(RSG = PopCap.RSG || (PopCap.RSG = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RSG.Unpack.forward();
