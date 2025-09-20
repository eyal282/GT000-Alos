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
                    var PAK;
                    (function (PAK) {
                        var Pack;
                        (function (Pack) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.pak.pack",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.pak.pack.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, true);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.pak`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.PAK.pack_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, true);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["directory", /(.*)\.data_package$/i],
                                    option: 26n,
                                });
                                return;
                            }
                            Pack.forward = forward;
                        })(Pack = PAK.Pack || (PAK.Pack = {}));
                    })(PAK = PopCap.PAK || (PopCap.PAK = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.PAK.Pack.forward();
