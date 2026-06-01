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
                        var UnpackResource;
                        (function (UnpackResource) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.rsb.unpack_resource",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.rsb.unpack_resource.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${argument.source}.bundle`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.RSB.unpack_resource(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.*)\.(rsb|obb)$/i],
                                    option: 59n,
                                });
                                return;
                            }
                            UnpackResource.forward = forward;
                        })(UnpackResource = RSB.UnpackResource || (RSB.UnpackResource = {}));
                    })(RSB = PopCap.RSB || (PopCap.RSB = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RSB.UnpackResource.forward();
