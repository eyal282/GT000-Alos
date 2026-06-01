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
                    var RTON;
                    (function (RTON) {
                        var Decode;
                        (function (Decode) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.rton.decode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.rton.decode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.json`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.RTON.decode_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)(\.rton|pp\.dat)$/i],
                                    option: 64n,
                                });
                                return;
                            }
                            Decode.forward = forward;
                        })(Decode = RTON.Decode || (RTON.Decode = {}));
                    })(RTON = PopCap.RTON || (PopCap.RTON = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RTON.Decode.forward();
