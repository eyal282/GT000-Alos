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
                        var PackResource;
                        (function (PackResource) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.rsb.pack_resource",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.rsb.pack_resource.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, true);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", Sen.Kernel.Path.except_extension(argument.source));
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.RSB.pack_resource(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward: undefined,
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["directory", /(.*)\.bundle$/i],
                                    option: 56n,
                                });
                                return;
                            }
                            PackResource.forward = forward;
                        })(PackResource = RSB.PackResource || (RSB.PackResource = {}));
                    })(RSB = PopCap.RSB || (PopCap.RSB = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RSB.PackResource.forward();
