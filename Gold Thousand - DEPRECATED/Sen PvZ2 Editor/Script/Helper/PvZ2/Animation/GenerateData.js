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
                        var GenerateData;
                        (function (GenerateData) {
                            function process(resolution, source, image_posix) {
                                const document = {};
                                Sen.Kernel.Support.PopCap.Animation.Miscellaneous.dump_document(source, document);
                                const result = {
                                    version: 6n,
                                    position: {
                                        x: 0n,
                                        y: 0n,
                                    },
                                    resolution,
                                    image: {},
                                    sprite: {},
                                };
                                document.image.forEach((e) => {
                                    const image_name = e.replace(/image\//, "").replace(/\.xml/, "");
                                    const image = Sen.Kernel.Image.open(Sen.Kernel.Path.normalize(`${source}/library/media/${image_name}.png`));
                                    const distance = 1200 / Number(resolution);
                                    result.image[image_name] = {
                                        id: `${image_posix}_${image_name.toUpperCase()}`,
                                        dimension: {
                                            width: BigInt(Math.round(Number(image.width) * distance)),
                                            height: BigInt(Math.round(Number(image.height) * distance)),
                                        },
                                    };
                                });
                                return result;
                            }
                            GenerateData.process = process;
                            function process_fs(source, destination, resolution, image_posix) {
                                const data = process(resolution, source, image_posix);
                                Sen.Kernel.JSON.serialize_fs(destination, data, 1, false);
                            }
                            GenerateData.process_fs = process_fs;
                            function execute() {
                                let resolution = 1536n;
                                const source = Script.Console.path("input source", "directory");
                                Script.Console.argument("input image posix for id");
                                const image_posix = Sen.Kernel.Console.readline();
                                process_fs(source, `${source}/data.generated.json`, resolution, image_posix);
                            }
                            GenerateData.execute = execute;
                        })(GenerateData = Miscellaenous.GenerateData || (Miscellaenous.GenerateData = {}));
                    })(Miscellaenous = Animation.Miscellaenous || (Animation.Miscellaenous = {}));
                })(Animation = PopCap.Animation || (PopCap.Animation = {}));
            })(PopCap = Support.PopCap || (Support.PopCap = {}));
        })(Support = Script.Support || (Script.Support = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Support.PopCap.Animation.Miscellaenous.GenerateData.execute();
