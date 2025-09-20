"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Executor;
        (function (Executor) {
            var Methods;
            (function (Methods) {
                var WWise;
                (function (WWise) {
                    var SoundBank;
                    (function (SoundBank) {
                        var Encode;
                        (function (Encode) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "wwise.soundbank.encode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/wwise.soundbank.encode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, true);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.bnk`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.WWise.SoundBank.encode_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, true);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["directory", /(.+)\.soundbank$/gi],
                                    option: 78n,
                                });
                                return;
                            }
                            Encode.forward = forward;
                        })(Encode = SoundBank.Encode || (SoundBank.Encode = {}));
                    })(SoundBank = WWise.SoundBank || (WWise.SoundBank = {}));
                })(WWise = Methods.WWise || (Methods.WWise = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.WWise.SoundBank.Encode.forward();
