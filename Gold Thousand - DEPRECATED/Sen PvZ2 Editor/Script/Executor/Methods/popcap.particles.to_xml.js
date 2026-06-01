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
                    var Particles;
                    (function (Particles) {
                        var ToXML;
                        (function (ToXML) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.particles.to_xml",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.particles.to_xml.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.Particles.to_xml(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)(\.xml)\.json$/i],
                                    option: 29n,
                                });
                                return;
                            }
                            ToXML.forward = forward;
                        })(ToXML = Particles.ToXML || (Particles.ToXML = {}));
                    })(Particles = PopCap.Particles || (PopCap.Particles = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Particles.ToXML.forward();
