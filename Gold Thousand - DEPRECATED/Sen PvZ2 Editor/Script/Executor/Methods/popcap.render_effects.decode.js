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
                    var RenderEffects;
                    (function (RenderEffects) {
                        var Decode;
                        (function (Decode) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.render_effects.decode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.render_effects.decode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${argument.source}.json`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.RenderEffects.decode_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.popfx$/i],
                                    option: 44n,
                                });
                                return;
                            }
                            Decode.forward = forward;
                        })(Decode = RenderEffects.Decode || (RenderEffects.Decode = {}));
                    })(RenderEffects = PopCap.RenderEffects || (PopCap.RenderEffects = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RenderEffects.Decode.forward();
