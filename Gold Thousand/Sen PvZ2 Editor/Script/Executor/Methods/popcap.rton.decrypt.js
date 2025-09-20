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
                        var Decrypt;
                        (function (Decrypt) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.rton.decrypt",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.rton.decrypt.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${argument.source}.bin`);
                                        Script.Console.output(argument.destination);
                                        Executor.load_string(argument, "key", this.configuration, Sen.Kernel.Language.get("popcap.rton.decrypt.key"));
                                        Executor.load_string(argument, "iv", this.configuration, Sen.Kernel.Language.get("popcap.rton.decrypt.iv"));
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.RTON.decrypt_fs(argument.source, argument.destination, argument.key, argument.iv);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)(\.rton|pp\.dat)$/i],
                                    option: 66n,
                                });
                                return;
                            }
                            Decrypt.forward = forward;
                        })(Decrypt = RTON.Decrypt || (RTON.Decrypt = {}));
                    })(RTON = PopCap.RTON || (PopCap.RTON = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RTON.Decrypt.forward();
