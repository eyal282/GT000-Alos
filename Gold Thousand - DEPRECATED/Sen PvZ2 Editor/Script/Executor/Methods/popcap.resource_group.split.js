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
                    var ResourceGroup;
                    (function (ResourceGroup) {
                        var Split;
                        (function (Split) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.resource_group.split",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.resource_group.split.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${argument.source}.info`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.ResourceGroup.split_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.json$/i],
                                    option: 51n,
                                });
                                return;
                            }
                            Split.forward = forward;
                        })(Split = ResourceGroup.Split || (ResourceGroup.Split = {}));
                    })(ResourceGroup = PopCap.ResourceGroup || (PopCap.ResourceGroup = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.ResourceGroup.Split.forward();
