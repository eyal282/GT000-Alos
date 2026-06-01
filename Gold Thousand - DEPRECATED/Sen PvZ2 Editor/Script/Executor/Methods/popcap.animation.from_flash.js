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
                    var Animation;
                    (function (Animation) {
                        var FromFlash;
                        (function (FromFlash) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.animation.from_flash",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.animation.from_flash.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, true);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.json`);
                                        Script.Console.output(argument.destination);
                                        Executor.load_boolean(argument, "has_label", this.configuration, Sen.Kernel.Language.get("popcap.animation.extract_label"));
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.Animation.FromFlash.convert_fs(argument.source, argument.destination, argument.has_label);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, true);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["directory", /(.+)\.xfl$/i],
                                    option: 12n,
                                });
                                return;
                            }
                            FromFlash.forward = forward;
                        })(FromFlash = Animation.FromFlash || (Animation.FromFlash = {}));
                    })(Animation = PopCap.Animation || (PopCap.Animation = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Animation.FromFlash.forward();
