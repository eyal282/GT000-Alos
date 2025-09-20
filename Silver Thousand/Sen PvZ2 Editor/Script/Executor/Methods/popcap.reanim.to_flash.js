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
                        var ToFlash;
                        (function (ToFlash) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.reanim.to_flash",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.reanim.to_flash.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.xfl`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.ReAnimation.ToFlash.convert_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)(\.reanim\.json)$/i],
                                    option: 42n,
                                });
                                return;
                            }
                            ToFlash.forward = forward;
                        })(ToFlash = Reanim.ToFlash || (Reanim.ToFlash = {}));
                    })(Reanim = PopCap.Reanim || (PopCap.Reanim = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Reanim.ToFlash.forward();
