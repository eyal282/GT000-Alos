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
                        var Pack;
                        (function (Pack) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.rsb.pack",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.rsb.pack.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, true);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", Sen.Kernel.Path.except_extension(argument.source));
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.RSB.pack_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward: undefined,
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["directory", /(.*)\.bundle$/i],
                                    option: 57n,
                                });
                                return;
                            }
                            Pack.forward = forward;
                        })(Pack = RSB.Pack || (RSB.Pack = {}));
                    })(RSB = PopCap.RSB || (PopCap.RSB = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RSB.Pack.forward();
