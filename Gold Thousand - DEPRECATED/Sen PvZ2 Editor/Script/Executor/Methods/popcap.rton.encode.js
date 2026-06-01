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
                        var Encode;
                        (function (Encode) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.rton.encode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.rton.encode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.rton`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.RTON.encode_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.json$/i],
                                    option: 68n,
                                });
                                return;
                            }
                            Encode.forward = forward;
                        })(Encode = RTON.Encode || (RTON.Encode = {}));
                    })(RTON = PopCap.RTON || (PopCap.RTON = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RTON.Encode.forward();
