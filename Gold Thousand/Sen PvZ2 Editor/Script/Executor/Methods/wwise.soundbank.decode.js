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
                        var Decode;
                        (function (Decode) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "wwise.soundbank.decode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/wwise.soundbank.decode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.soundbank`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.WWise.SoundBank.decode_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.bnk$/i],
                                    option: 77n,
                                });
                                return;
                            }
                            Decode.forward = forward;
                        })(Decode = SoundBank.Decode || (SoundBank.Decode = {}));
                    })(SoundBank = WWise.SoundBank || (WWise.SoundBank = {}));
                })(WWise = Methods.WWise || (Methods.WWise = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.WWise.SoundBank.Decode.forward();
