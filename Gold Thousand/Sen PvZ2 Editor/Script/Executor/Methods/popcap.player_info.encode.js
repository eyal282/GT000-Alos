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
                    var PlayerInfo;
                    (function (PlayerInfo) {
                        var Encode;
                        (function (Encode) {
                            Encode._platform = ["pc", "game-console", "phone-32", "phone-64", "tv"];
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.player_info.encode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.player_info.encode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.PlayerInfo.encode_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.dat\.json$/i],
                                    option: 32n,
                                });
                                return;
                            }
                            Encode.forward = forward;
                        })(Encode = PlayerInfo.Encode || (PlayerInfo.Encode = {}));
                    })(PlayerInfo = PopCap.PlayerInfo || (PopCap.PlayerInfo = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.PlayerInfo.Encode.forward();
