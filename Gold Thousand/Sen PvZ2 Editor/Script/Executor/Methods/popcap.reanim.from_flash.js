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
                    var Reanim;
                    (function (Reanim) {
                        var FromFlash;
                        (function (FromFlash) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.reanim.from_flash",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.reanim.from_flash.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, true);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.json`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.ReAnimation.FromFlash.convert_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, true);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["directory", /(.+)(\.reanim\.xfl)$/i],
                                    option: 40n,
                                });
                                return;
                            }
                            FromFlash.forward = forward;
                        })(FromFlash = Reanim.FromFlash || (Reanim.FromFlash = {}));
                    })(Reanim = PopCap.Reanim || (PopCap.Reanim = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Reanim.FromFlash.forward();
