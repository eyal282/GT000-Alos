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
                        var Encode;
                        (function (Encode) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.compiled_text.encode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.compiled_text.encode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${argument.source}.bin`);
                                        Script.Console.output(argument.destination);
                                        Executor.load_string(argument, "key", this.configuration, Sen.Kernel.Language.get("popcap.compiled_text.encode.key"));
                                        Executor.load_string(argument, "iv", this.configuration, Sen.Kernel.Language.get("popcap.compiled_text.encode.iv"));
                                        Executor.load_boolean(argument, "use_64_bit_variant", this.configuration, Sen.Kernel.Language.get("popcap.compiled_text.encode.use_64_bit_variant"));
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.CompiledText.encode_fs(argument.source, argument.destination, argument.key, argument.iv, argument.use_64_bit_variant);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.bin$/i],
                                    option: 20n,
                                });
                                return;
                            }
                            Encode.forward = forward;
                        })(Encode = CompiledText.Encode || (CompiledText.Encode = {}));
                    })(CompiledText = PopCap.CompiledText || (PopCap.CompiledText = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.CompiledText.Encode.forward();
