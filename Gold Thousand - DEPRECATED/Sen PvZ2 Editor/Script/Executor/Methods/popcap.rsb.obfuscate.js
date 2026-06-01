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
                        var Obfuscate;
                        (function (Obfuscate) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.rsb.obfuscate",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.rsb.obfuscate.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${argument.source}.bin`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Script.Support.PopCap.ResourceStreamBundle.Miscellaneous.Obfuscate.process_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.*)\.(rsb|obb)$/i],
                                    option: 54n,
                                });
                                return;
                            }
                            Obfuscate.forward = forward;
                        })(Obfuscate = RSB.Obfuscate || (RSB.Obfuscate = {}));
                    })(RSB = PopCap.RSB || (PopCap.RSB = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RSB.Obfuscate.forward();
