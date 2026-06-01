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
                        var ToAPNG;
                        (function (ToAPNG) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.animation.to_apng",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.animation.to_apng.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Script.Console.output(argument.source);
                                        Executor.defined_or_default(argument, "destination", Sen.Kernel.Path.resolve(`${argument.source}.animation`));
                                        if (argument.media === undefined) {
                                            argument.media = Script.Console.path(Sen.Kernel.Language.get("popcap.animation.to_apng.input_media"), "directory");
                                        }
                                        const setting = {
                                            image_id: false,
                                            frame_name: "frame",
                                            sprite_disable: [],
                                            background_color: [0n, 0n, 0n, 0n],
                                            rendering_size: {
                                                width: 0n,
                                                height: 0n,
                                                scale: 1,
                                            },
                                            position_additional: {
                                                x: 0,
                                                y: 0,
                                            },
                                            apng_setting: {
                                                make_apng: true,
                                                split_label: true,
                                                frame_rate: 0n,
                                                loop: 0n,
                                            },
                                        };
                                        const animation = Sen.Kernel.JSON.deserialize_fs(argument.source);
                                        Script.Support.PopCap.Animation.Miscellaenous.GenerateAnimation.exchange_sprite_disable(animation, setting);
                                        Script.Console.output(`${Sen.Kernel.Language.get("popcap.animation.to_apng.total_frame")}: ${animation.main_sprite.frame.length}`);
                                        Executor.clock.start_safe();
                                        Script.Support.PopCap.Animation.Miscellaenous.GenerateAnimation.process(animation, argument.media, argument.destination, setting);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /.*(\.pam\.json)$/i],
                                    option: 13n,
                                });
                                return;
                            }
                            ToAPNG.forward = forward;
                        })(ToAPNG = Animation.ToAPNG || (Animation.ToAPNG = {}));
                    })(Animation = PopCap.Animation || (PopCap.Animation = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Animation.ToAPNG.forward();
