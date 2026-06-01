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
                        var FromXML;
                        (function (FromXML) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.particles.from_xml",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.particles.from_xml.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.xml.json`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.Particles.from_xml(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.xml$/i],
                                    option: 30n,
                                });
                                return;
                            }
                            FromXML.forward = forward;
                        })(FromXML = Particles.FromXML || (Particles.FromXML = {}));
                    })(Particles = PopCap.Particles || (PopCap.Particles = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Particles.FromXML.forward();
