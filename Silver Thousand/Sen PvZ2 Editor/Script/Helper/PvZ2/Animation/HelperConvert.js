"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Support;
        (function (Support) {
            var PopCap;
            (function (PopCap) {
                var Animation;
                (function (Animation) {
                    var Miscellaenous;
                    (function (Miscellaenous) {
                        var HelperConvert;
                        (function (HelperConvert) {
                            function convert(animation) {
                                const rewrite_sprite = (e) => {
                                    const sprite = {
                                        name: e.name,
                                        work_area: [e.work_area.start, e.work_area.duration],
                                        frame: e.frame.map(function (f) {
                                            const frame_helper = {
                                                label: f.label,
                                                stop: f.stop,
                                                command: f.command.map(function (c) {
                                                    const command_helper = [c.command, c.parameter];
                                                    return command_helper;
                                                }),
                                                remove: f.remove.map(function (r) {
                                                    return { index: r };
                                                }),
                                                append: f.append,
                                                change: f.change,
                                            };
                                            return frame_helper;
                                        }),
                                    };
                                    return sprite;
                                };
                                const animation_helper = {
                                    version: animation.version,
                                    frame_rate: animation.frame_rate,
                                    position: [BigInt(animation.position.x), BigInt(animation.position.y)],
                                    size: [BigInt(animation.size.width), BigInt(animation.size.height)],
                                    image: animation.image.map(function (e) {
                                        const image_helper = {
                                            name: `${e.path}|${e.id}`,
                                            size: [BigInt(animation.size.width), BigInt(animation.size.height)],
                                            transform: e.transform,
                                        };
                                        return image_helper;
                                    }),
                                    sprite: animation.sprite.map((e) => rewrite_sprite(e)),
                                    main_sprite: rewrite_sprite(animation.main_sprite),
                                };
                                return animation_helper;
                            }
                            HelperConvert.convert = convert;
                            function process(animation) {
                                const animation_helper = convert(animation);
                                return animation_helper;
                            }
                            HelperConvert.process = process;
                            function execute() {
                                const source = Script.Console.path(Sen.Kernel.Language.get("script.helper.pvz2.animation.helper_convert.input_source_pam_json"), "file");
                                const animation = Sen.Kernel.JSON.deserialize_fs(source);
                                Sen.Kernel.JSON.serialize_fs(`${Sen.Kernel.Path.except_extension(source)}.twinstar.json`, process(animation), 1, false);
                                return;
                            }
                            HelperConvert.execute = execute;
                        })(HelperConvert = Miscellaenous.HelperConvert || (Miscellaenous.HelperConvert = {}));
                    })(Miscellaenous = Animation.Miscellaenous || (Animation.Miscellaenous = {}));
                })(Animation = PopCap.Animation || (PopCap.Animation = {}));
            })(PopCap = Support.PopCap || (Support.PopCap = {}));
        })(Support = Script.Support || (Script.Support = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Support.PopCap.Animation.Miscellaenous.HelperConvert.execute();
