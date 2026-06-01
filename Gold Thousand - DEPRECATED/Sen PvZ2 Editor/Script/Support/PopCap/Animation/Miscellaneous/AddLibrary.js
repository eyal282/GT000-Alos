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
                        var AddLibrary;
                        (function (AddLibrary) {
                            function check_duplicate() { }
                            AddLibrary.check_duplicate = check_duplicate;
                            function process(source, image_posix, additional) {
                                const document = {};
                                const data_path = `${source}/data.json`;
                                Sen.Kernel.Support.PopCap.Animation.Miscellaneous.dump_document(source, document);
                                const data = Sen.Kernel.JSON.deserialize_fs(data_path);
                                let base_transform;
                                const additional_data = {
                                    image: [],
                                    action: [],
                                    media: [],
                                    sprite: [],
                                };
                                const resolution = data.resolution;
                                switch (resolution) {
                                    case 768n:
                                        base_transform = [1.28125, 0.0, 0.0, 1.28125, -2.75, -2.75];
                                        break;
                                    case 1536n:
                                        base_transform = [0.78125, 0.0, 0.0, 0.78125, -2.75, -2.75];
                                        break;
                                    default:
                                        throw new Error(`resolution ${resolution} not found`);
                                }
                                const multipler = 1200 / Number(data.resolution);
                                for (const { media, image, sprite, original_path } of additional) {
                                    Sen.Kernel.FileSystem.Operation.copy(original_path, `${source}/library/media/${media}.png`);
                                    Sen.Kernel.Support.PopCap.Animation.Miscellaneous.generate_image(`${source}/library/image/${image}.xml`, new Sen.Kernel.Support.PopCap.Animation.Miscellaneous.Image(media, media, base_transform));
                                    additional_data.media.push(media);
                                    additional_data.image.push(image);
                                    const img = Sen.Kernel.Image.open(original_path);
                                    data.image[image] = {
                                        id: `${image_posix}_${image}`.toUpperCase(),
                                        dimension: {
                                            width: BigInt(Math.ceil(multipler * Number(img.width))),
                                            height: BigInt(Math.ceil(multipler * Number(img.height))),
                                        },
                                    };
                                    if (sprite !== undefined) {
                                        Sen.Kernel.Support.PopCap.Animation.Miscellaneous.generate_sprite(`${source}/library/sprite/${sprite}.xml`, new Sen.Kernel.Support.PopCap.Animation.Miscellaneous.Sprite(sprite, `image/${image}`, base_transform, [1.0, 1.0, 1.0, 1.0]));
                                        additional_data.sprite.push(sprite);
                                    }
                                }
                                Sen.Kernel.JSON.serialize_fs(data_path, data, 1, false);
                                Sen.Kernel.Support.PopCap.Animation.Miscellaneous.generate_document(`${source}/DOMDocument.xml`, additional_data);
                                return;
                            }
                            AddLibrary.process = process;
                            function process_fs(source, image_posix, additional) {
                                return process(source, image_posix, additional);
                            }
                            AddLibrary.process_fs = process_fs;
                        })(AddLibrary = Miscellaenous.AddLibrary || (Miscellaenous.AddLibrary = {}));
                    })(Miscellaenous = Animation.Miscellaenous || (Animation.Miscellaenous = {}));
                })(Animation = PopCap.Animation || (PopCap.Animation = {}));
            })(PopCap = Support.PopCap || (Support.PopCap = {}));
        })(Support = Script.Support || (Script.Support = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
