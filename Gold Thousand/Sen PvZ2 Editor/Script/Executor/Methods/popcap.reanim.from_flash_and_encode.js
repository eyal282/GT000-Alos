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
                        var FromFlashAndEncode;
                        (function (FromFlashAndEncode) {
                            let Detail;
                            (function (Detail) {
                                Detail._platform = ["pc", "game-console", "phone-32", "phone-64", "tv"];
                                function platform() {
                                    return Detail._platform.map((e, i) => [BigInt(i + 1), e, Sen.Kernel.Language.get(`popcap.reanim.platform.${e}`)]);
                                }
                                Detail.platform = platform;
                            })(Detail = FromFlashAndEncode.Detail || (FromFlashAndEncode.Detail = {}));
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.reanim.from_flash_and_encode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.reanim.from_flash_and_encode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, true);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.compiled`);
                                        Script.Console.output(argument.destination);
                                        Script.Console.argument(Sen.Kernel.Language.get("popcap.reanim.decode.generic"));
                                        Executor.configurate_or_input(argument, "platform", Detail.platform());
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.ReAnimation.Instance.from_flash(argument.source, argument.destination, argument.platform);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, true);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["directory", /(.+)(\.reanim\.xfl)$/i],
                                    option: 39n,
                                });
                                return;
                            }
                            FromFlashAndEncode.forward = forward;
                        })(FromFlashAndEncode = Reanim.FromFlashAndEncode || (Reanim.FromFlashAndEncode = {}));
                    })(Reanim = PopCap.Reanim || (PopCap.Reanim = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Reanim.FromFlashAndEncode.forward();
