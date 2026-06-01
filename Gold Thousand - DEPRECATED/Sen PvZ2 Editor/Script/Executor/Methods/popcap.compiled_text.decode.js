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
                    var CompiledText;
                    (function (CompiledText) {
                        var Decode;
                        (function (Decode) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.compiled_text.decode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.compiled_text.decode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${argument.source}.bin`);
                                        Script.Console.output(argument.destination);
                                        Executor.load_string(argument, "key", this.configuration, Sen.Kernel.Language.get("popcap.compiled_text.decode.key"));
                                        Executor.load_string(argument, "iv", this.configuration, Sen.Kernel.Language.get("popcap.compiled_text.decode.iv"));
                                        Executor.load_boolean(argument, "use_64_bit_variant", this.configuration, Sen.Kernel.Language.get("popcap.compiled_text.decode.key"));
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.CompiledText.decode_fs(argument.source, argument.destination, argument.key, argument.iv, argument.use_64_bit_variant);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.txt$/i],
                                    option: 19n,
                                });
                                return;
                            }
                            Decode.forward = forward;
                        })(Decode = CompiledText.Decode || (CompiledText.Decode = {}));
                    })(CompiledText = PopCap.CompiledText || (PopCap.CompiledText = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.CompiledText.Decode.forward();
