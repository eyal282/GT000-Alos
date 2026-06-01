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
                        var DecodeAndToFlash;
                        (function (DecodeAndToFlash) {
                            let Detail;
                            (function (Detail) {
                                Detail._platform = ["pc", "game-console", "phone-32", "phone-64", "tv"];
                                function platform() {
                                    return Detail._platform.map((e, i) => [BigInt(i + 1), e, Sen.Kernel.Language.get(`popcap.reanim.platform.${e}`)]);
                                }
                                Detail.platform = platform;
                            })(Detail = DecodeAndToFlash.Detail || (DecodeAndToFlash.Detail = {}));
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.reanim.decode_and_to_flash",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.reanim.decode_and_to_flash.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.xfl`);
                                        Script.Console.output(argument.destination);
                                        Script.Console.argument(Sen.Kernel.Language.get("popcap.reanim.decode.generic"));
                                        Executor.configurate_or_input(argument, "platform", Detail.platform());
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.ReAnimation.Instance.to_flash(argument.source, argument.destination, argument.platform);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)(\.reanim|\.reanim\.compiled)$/i],
                                    option: 38n,
                                });
                                return;
                            }
                            DecodeAndToFlash.forward = forward;
                        })(DecodeAndToFlash = Reanim.DecodeAndToFlash || (Reanim.DecodeAndToFlash = {}));
                    })(Reanim = PopCap.Reanim || (PopCap.Reanim = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Reanim.DecodeAndToFlash.forward();
