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
                        var GenerateFlashFromMedia;
                        (function (GenerateFlashFromMedia) {
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
                                Detail.has_label = () => {
                                    return [
                                        [1n, 1n, Sen.Kernel.Language.get("input.set_argument_to_true")],
                                        [2n, 0n, Sen.Kernel.Language.get("input.set_argument_to_false")],
                                    ];
                                };
                            })(Detail = GenerateFlashFromMedia.Detail || (GenerateFlashFromMedia.Detail = {}));
                            function load_bigint(rule) {
                                const new_rule = [];
                                rule.forEach(function make_rule(e) {
                                    if (Sen.Shell.is_gui()) {
                                        Sen.Kernel.Console.print(`${e[0]}. ${e[2]}`);
                                    }
                                    else {
                                        Sen.Kernel.Console.print(`    ${e[0]}. ${e[2]}`);
                                    }
                                    new_rule.push(e[0]);
                                });
                                return rule[Number(Sen.Script.Executor.input_integer(new_rule) - 1n)][1];
                            }
                            GenerateFlashFromMedia.load_bigint = load_bigint;
                            function read_animation_name() {
                                let animation_name = Sen.Kernel.Console.readline();
                                let index = 0;
                                while (index < animation_name.length) {
                                    if (animation_name[index] === " ") {
                                        Script.Console.warning(Sen.Kernel.Language.get("script.helper.pvz2.animation.generate_flash_from_media.animation_name_must_not_cotain_space_char"));
                                        animation_name = Sen.Kernel.Console.readline();
                                        index = 0;
                                    }
                                    else if (animation_name.charCodeAt(index) > 127) {
                                        Script.Console.warning(Sen.Kernel.Language.get("script.helper.pvz2.animation.generate_flash_from_media.animation_name_must_be_ascii"));
                                        animation_name = Sen.Kernel.Console.readline();
                                        index = 0;
                                    }
                                    else {
                                        ++index;
                                    }
                                }
                                return animation_name;
                            }
                            GenerateFlashFromMedia.read_animation_name = read_animation_name;
                            function execute() {
                                const source = Script.Console.path(Sen.Kernel.Language.get("script.helper.pvz2.animation.generate_flash_from_media.input_media_path"), "directory");
                                Script.Console.argument(Sen.Kernel.Language.get("script.helper.pvz2.animation.generate_flash_from_media.enter_animation_name"));
                                const animation_name = read_animation_name();
                                const animation = {
                                    version: 6n,
                                    frame_rate: 30n,
                                    position: {
                                        x: 0,
                                        y: 0,
                                    },
                                    size: {
                                        width: 390,
                                        height: 390,
                                    },
                                    image: [],
                                    sprite: [],
                                    main_sprite: {
                                        name: "",
                                        work_area: {
                                            start: 0n,
                                            duration: 1n,
                                        },
                                        frame: [
                                            {
                                                label: "animation",
                                                stop: false,
                                                remove: [],
                                                append: [],
                                                change: [],
                                                command: [],
                                            },
                                        ],
                                    },
                                };
                                Script.Console.argument(Sen.Kernel.Language.get("popcap.animation.to_flash.resolution"));
                                const input_generic = load_bigint(Detail.resolution());
                                Script.Console.argument(Sen.Kernel.Language.get("popcap.animation.extract_label"));
                                const has_label = load_bigint(Detail.has_label()) == 1n;
                                const image_list = [];
                                for (let e of Sen.Kernel.FileSystem.read_directory_only_file(source)) {
                                    if (Sen.Kernel.Path.extname(e).toLowerCase() === ".png") {
                                        image_list.push(e);
                                    }
                                }
                                const destination = `${Sen.Kernel.Path.dirname(source)}/${animation_name}.pam.xfl`;
                                Script.Console.output(destination);
                                Script.Console.output(`${Sen.Kernel.Language.get("script.helper.pvz2.animation.generate_flash_from_media.total_image_count")}: ${image_list.length}`);
                                const k_resolution_ratio = 1200 / Number(input_generic);
                                const k_default_transform = [1.0, 0.0, 0.0, 1.0, 0.0, 0.0];
                                Sen.Kernel.FileSystem.create_directory(`${destination}/library/media`);
                                const image_dulicate = {};
                                for (let e of image_list) {
                                    const image = Sen.Kernel.Image.open(e);
                                    const image_width = BigInt(Math.round(Number(image.width) * k_resolution_ratio));
                                    const image_height = BigInt(Math.round(Number(image.height) * k_resolution_ratio));
                                    let image_dimension = `${image_width}x${image_height}`;
                                    if (image_dulicate.hasOwnProperty(image_dimension)) {
                                        image_dimension += `_${++image_dulicate[image_dimension]}`;
                                    }
                                    else {
                                        image_dulicate[image_dimension] = 1n;
                                    }
                                    animation.image.push({
                                        path: `${animation_name}_${image_dimension}`,
                                        id: `image_${animation_name}_${animation_name}_${image_dimension}`.toUpperCase(),
                                        dimension: {
                                            width: image_width,
                                            height: image_height,
                                        },
                                        transform: k_default_transform,
                                    });
                                    Sen.Kernel.Image.write(`${destination}/library/media/${animation_name}_${image_dimension}.png`, image);
                                }
                                Sen.Kernel.Support.PopCap.Animation.ToFlash.process(animation, destination, input_generic, has_label);
                                return;
                            }
                            GenerateFlashFromMedia.execute = execute;
                        })(GenerateFlashFromMedia = Miscellaenous.GenerateFlashFromMedia || (Miscellaenous.GenerateFlashFromMedia = {}));
                    })(Miscellaenous = Animation.Miscellaenous || (Animation.Miscellaenous = {}));
                })(Animation = PopCap.Animation || (PopCap.Animation = {}));
            })(PopCap = Support.PopCap || (Support.PopCap = {}));
        })(Support = Script.Support || (Script.Support = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Support.PopCap.Animation.Miscellaenous.GenerateFlashFromMedia.execute();
