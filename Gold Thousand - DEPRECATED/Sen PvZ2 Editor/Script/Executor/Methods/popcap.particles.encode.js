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
                        var Encode;
                        (function (Encode) {
                            let Detail;
                            (function (Detail) {
                                Detail._platform = ["pc", "game-console", "phone-32", "phone-64", "tv"];
                                function platform() {
                                    return Detail._platform.map((e, i) => [BigInt(i + 1), e, Sen.Kernel.Language.get(`popcap.reanim.platform.${e}`)]);
                                }
                                Detail.platform = platform;
                            })(Detail = Encode.Detail || (Encode.Detail = {}));
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.particles.encode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.particles.encode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.compiled`);
                                        Script.Console.output(argument.destination);
                                        Script.Console.argument(Sen.Kernel.Language.get("popcap.particles.encode.generic"));
                                        Executor.configurate_or_input(argument, "platform", Detail.platform());
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.Particles.encode_fs(argument.source, argument.destination, argument.platform);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)(\.xml)\.json$/i],
                                    option: 28n,
                                });
                                return;
                            }
                            Encode.forward = forward;
                        })(Encode = Particles.Encode || (Particles.Encode = {}));
                    })(Particles = PopCap.Particles || (PopCap.Particles = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Particles.Encode.forward();
