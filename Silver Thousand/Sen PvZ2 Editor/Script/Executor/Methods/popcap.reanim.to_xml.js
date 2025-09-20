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
                    var ReAnimation;
                    (function (ReAnimation) {
                        var ToXML;
                        (function (ToXML) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.reanim.to_xml",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.reanim.to_xml.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.xml`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.ReAnimation.to_xml(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)(\.reanim\.json)$/i],
                                    option: 43n,
                                });
                                return;
                            }
                            ToXML.forward = forward;
                        })(ToXML = ReAnimation.ToXML || (ReAnimation.ToXML = {}));
                    })(ReAnimation = PopCap.ReAnimation || (PopCap.ReAnimation = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.ReAnimation.ToXML.forward();
