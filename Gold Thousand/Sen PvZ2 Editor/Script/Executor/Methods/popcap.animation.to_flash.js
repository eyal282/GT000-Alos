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
                    var Animation;
                    (function (Animation) {
                        var ToFlash;
                        (function (ToFlash) {
                            let Detail;
                            (function (Detail) {
                                Detail.resolution = () => {
                                    return [
                                        [1n, 1536n, Sen.Kernel.Language.get("popcap.animation.to_flash.resolution.1536n")],
                                        [2n, 768n, Sen.Kernel.Language.get("popcap.animation.to_flash.resolution.768n")],
                                        [3n, 384n, Sen.Kernel.Language.get("popcap.animation.to_flash.resolution.384n")],
                                        [4n, 1200n, Sen.Kernel.Language.get("popcap.animation.to_flash.resolution.1200n")],
                                        [5n, 640n, Sen.Kernel.Language.get("popcap.animation.to_flash.resolution.640n")],
                                    ];
                                };
                            })(Detail = ToFlash.Detail || (ToFlash.Detail = {}));
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.animation.to_flash",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.animation.to_flash.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.xfl`);
                                        Script.Console.output(argument.destination);
                                        Executor.load_bigint(argument, "resolution", this.configuration, Detail.resolution(), Sen.Kernel.Language.get("popcap.animation.to_flash.resolution"));
                                        Executor.load_boolean(argument, "has_label", this.configuration, Sen.Kernel.Language.get("popcap.animation.extract_label"));
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.Animation.ToFlash.convert_fs(argument.source, argument.destination, BigInt(argument.resolution), argument.has_label);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        Executor.load_bigint(argument, "resolution", this.configuration, Detail.resolution(), Sen.Kernel.Language.get("popcap.animation.to_flash.resolution"));
                                        return Executor.basic_batch(this, argument, false, { resolution: BigInt(argument.resolution) });
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /.*\.pam\.json$/i],
                                    option: 14n,
                                });
                                return;
                            }
                            ToFlash.forward = forward;
                        })(ToFlash = Animation.ToFlash || (Animation.ToFlash = {}));
                    })(Animation = PopCap.Animation || (PopCap.Animation = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Animation.ToFlash.forward();
