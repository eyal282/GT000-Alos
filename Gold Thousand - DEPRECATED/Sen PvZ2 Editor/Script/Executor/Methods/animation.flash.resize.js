"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Executor;
        (function (Executor) {
            var Methods;
            (function (Methods) {
                var Animation;
                (function (Animation) {
                    var Flash;
                    (function (Flash) {
                        var Resize;
                        (function (Resize) {
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
                            })(Detail = Resize.Detail || (Resize.Detail = {}));
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "animation.flash.resize",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/animation.flash.resize.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, true);
                                        Script.Console.obtained(argument.source);
                                        Script.Console.output(argument.source);
                                        Executor.load_bigint(argument, "resolution", this.configuration, Detail.resolution(), Sen.Kernel.Language.get("popcap.animation.to_flash.resolution"));
                                        Executor.clock.start_safe();
                                        Sen.Kernel.Support.PopCap.Animation.Miscellaneous.resize_fs(argument.source, BigInt(argument.resolution));
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        Executor.load_bigint(argument, "resolution", this.configuration, Detail.resolution(), Sen.Kernel.Language.get("popcap.animation.to_flash.resolution"));
                                        return Executor.basic_batch(this, argument, false, { resolution: BigInt(argument.resolution) });
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["directory", /.*(\.xfl|\.pam\.xfl)$/i],
                                    option: 7n,
                                });
                                return;
                            }
                            Resize.forward = forward;
                        })(Resize = Flash.Resize || (Flash.Resize = {}));
                    })(Flash = Animation.Flash || (Animation.Flash = {}));
                })(Animation = Methods.Animation || (Methods.Animation = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.Animation.Flash.Resize.forward();
