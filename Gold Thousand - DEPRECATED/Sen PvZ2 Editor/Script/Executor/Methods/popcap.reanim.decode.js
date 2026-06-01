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
                                    id: "popcap.reanim.decode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.reanim.decode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.json`);
                                        Script.Console.output(argument.destination);
                                        Script.Console.argument(Sen.Kernel.Language.get("popcap.reanim.decode.generic"));
                                        Executor.configurate_or_input(argument, "platform", Detail.platform());
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.ReAnimation.decode_fs(argument.source, argument.destination, argument.platform);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)(\.reanim|\.reanim\.compiled)$/i],
                                    option: 36n,
                                });
                                return;
                            }
                            Decode.forward = forward;
                        })(Decode = ReAnimation.Decode || (ReAnimation.Decode = {}));
                    })(ReAnimation = PopCap.ReAnimation || (PopCap.ReAnimation = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.ReAnimation.Decode.forward();
