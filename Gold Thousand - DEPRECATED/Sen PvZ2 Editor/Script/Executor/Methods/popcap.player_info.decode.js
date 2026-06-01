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
                        var Decode;
                        (function (Decode) {
                            Decode._platform = ["pc", "game-console", "phone-32", "phone-64", "tv"];
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.player_info.decode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.player_info.decode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${argument.source}.json`);
                                        Script.Console.output(argument.destination);
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.PlayerInfo.decode_fs(argument.source, argument.destination);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.dat$/i],
                                    option: 31n,
                                });
                                return;
                            }
                            Decode.forward = forward;
                        })(Decode = PlayerInfo.Decode || (PlayerInfo.Decode = {}));
                    })(PlayerInfo = PopCap.PlayerInfo || (PopCap.PlayerInfo = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.PlayerInfo.Decode.forward();
