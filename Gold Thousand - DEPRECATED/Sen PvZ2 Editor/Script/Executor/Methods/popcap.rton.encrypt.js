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
                        var Encrypt;
                        (function (Encrypt) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.rton.encrypt",
                                    configuration_file: Sen.Script.Home.query("~/Executor/Configuration/popcap.rton.encrypt.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${argument.source}.bin`);
                                        Script.Console.output(argument.destination);
                                        Executor.load_string(argument, "key", this.configuration, Sen.Kernel.Language.get("popcap.rton.decrypt.key"));
                                        Executor.load_string(argument, "iv", this.configuration, Sen.Kernel.Language.get("popcap.rton.decrypt.iv"));
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.RTON.encrypt_fs(argument.source, argument.destination, argument.key, argument.iv);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)(\.rton|pp\.dat)$/i],
                                    option: 69n,
                                });
                                return;
                            }
                            Encrypt.forward = forward;
                        })(Encrypt = RTON.Encrypt || (RTON.Encrypt = {}));
                    })(RTON = PopCap.RTON || (PopCap.RTON = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RTON.Encrypt.forward();
