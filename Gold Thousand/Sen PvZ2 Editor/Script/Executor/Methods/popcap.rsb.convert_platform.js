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
                    var RSB;
                    (function (RSB) {
                        var ToIOS;
                        (function (ToIOS) {
                            let Detail;
                            (function (Detail) {
                                function generic() {
                                    return [
                                        [1n, 0n, Sen.Kernel.Language.get("popcap.rsb.convert_platform.convert_android_to_ios")],
                                        [2n, 1n, Sen.Kernel.Language.get("popcap.rsb.convert_platform.convert_ios_to_android")],
                                    ];
                                }
                                Detail.generic = generic;
                            })(Detail = ToIOS.Detail || (ToIOS.Detail = {}));
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.rsb.convert_platform",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.rsb.convert_platform.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${argument.source}.bundle`);
                                        Script.Console.output(argument.destination);
                                        Executor.load_bigint(argument, "generic", this.configuration, Detail.generic(), Sen.Kernel.Language.get("popcap.rsb.convert_platform.platform_convert"));
                                        Executor.clock.start_safe();
                                        Script.Support.PopCap.ResourceStreamBundle.Miscellaneous.PlatformConverter.process_fs(argument.source, argument.destination, argument.generic !== 1n);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.*)\.(rsb|obb)$/i],
                                    option: 80n,
                                });
                                return;
                            }
                            ToIOS.forward = forward;
                        })(ToIOS = RSB.ToIOS || (RSB.ToIOS = {}));
                    })(RSB = PopCap.RSB || (PopCap.RSB = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.RSB.ToIOS.forward();
