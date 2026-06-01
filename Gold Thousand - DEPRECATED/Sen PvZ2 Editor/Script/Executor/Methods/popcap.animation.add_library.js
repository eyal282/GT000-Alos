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
                        var AddLibrary;
                        (function (AddLibrary) {
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "popcap.animation.add_library",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/popcap.animation.add_library.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, true);
                                        Script.Console.obtained(argument.source);
                                        Script.Console.output(argument.source);
                                        let image_source = Script.Console.path(Sen.Kernel.Language.get("popcap.animation.add_library.input_png_path"), "any");
                                        if (Sen.Kernel.FileSystem.is_directory(image_source)) {
                                            image_source = Sen.Kernel.FileSystem.read_directory(image_source);
                                        }
                                        Script.Console.argument(Sen.Kernel.Language.get("popcap.animation.add_library.image_posix_for_id"));
                                        argument.image_posix = Sen.Kernel.Console.readline();
                                        Script.Console.argument(Sen.Kernel.Language.get("popcap.animation.add_library.generate_sprite"));
                                        const has_sprite = Executor.input_boolean();
                                        const input_sprite = (media) => {
                                            let sprite = undefined;
                                            if (has_sprite) {
                                                Script.Console.argument(`${Sen.Kernel.Language.get("popcap.animation.add_library.sprite_name")} ${media}`);
                                                sprite = has_sprite ? Sen.Kernel.Console.readline() : undefined;
                                            }
                                            return sprite;
                                        };
                                        if (Array.isArray(image_source)) {
                                            argument.additional = image_source.map(function process_source(e, i) {
                                                const media = Sen.Kernel.Path.base_without_extension(e);
                                                const sprite = input_sprite(media);
                                                return {
                                                    original_path: e,
                                                    image: media,
                                                    media: media,
                                                    sprite: sprite,
                                                };
                                            });
                                        }
                                        else {
                                            const media = Sen.Kernel.Path.base_without_extension(image_source);
                                            const sprite = input_sprite(media);
                                            argument.additional = [
                                                {
                                                    original_path: image_source,
                                                    image: media,
                                                    media: media,
                                                    sprite: sprite,
                                                },
                                            ];
                                        }
                                        Executor.clock.start_safe();
                                        Script.Support.PopCap.Animation.Miscellaenous.AddLibrary.process_fs(argument.source, argument.image_posix, argument.additional);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["directory", /(.+)\.xfl$/i],
                                    option: 79n,
                                });
                                return;
                            }
                            AddLibrary.forward = forward;
                        })(AddLibrary = Animation.AddLibrary || (Animation.AddLibrary = {}));
                    })(Animation = PopCap.Animation || (PopCap.Animation = {}));
                })(PopCap = Methods.PopCap || (Methods.PopCap = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.PopCap.Animation.AddLibrary.forward();
