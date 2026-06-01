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
                        var Decode;
                        (function (Decode) {
                            let Detail;
                            (function (Detail) {
                                Detail._platform = ["pc", "game-console", "phone-32", "phone-64", "tv"];
                                function platform() {
                                    return Detail._platform.map((e, i) => [BigInt(i + 1), e, Sen.Kernel.Language.get(`popcap.reanim.platform.${e}`)]);
                                }
                                Detail.platform = platform;
                            })(Detail = Decode.Detail || (Decode.Detail = {}));
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.particles.decode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.particles.decode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.json`);
                                        Script.Console.output(argument.destination);
                                        Script.Console.argument(Sen.Kernel.Language.get("popcap.particles.decode.generic"));
                                        Executor.configurate_or_input(argument, "platform", Detail.platform());
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.Particles.decode_fs(argument.source, argument.destination, argument.platform);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)(\.xml|\.xml\.compiled)$/i],
                                    option: 27n,
                                });
                                return;
                            }
                            Decode.forward = forward;
                        })(Decode = Particles.Decode || (Particles.Decode = {}));
                    })(Particles = PopCap.Particles || (PopCap.Particles = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Particles.Decode.forward();
