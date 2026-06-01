"use strict";
var Sen;
(function (Sen) {
    var Script;
    (function (Script) {
        var Executor;
        (function (Executor) {
            var Methods;
            (function (Methods) {
                var WWise;
                (function (WWise) {
                    var Media;
                    (function (Media) {
                        var Encode;
                        (function (Encode) {
                            let Detail;
                            (function (Detail) {
                                function format() {
                                    return [
                                        [1n, "pcm", "16-bit Little Endian PCM (pcm)"],
                                        [2n, "adpcm", "Platinum 4-bit ADPCM (adpcm)"],
                                        [3n, "vorbis", "Custom Vorbis (vorbis)"],
                                        [4n, "wemopus", "libopus Opus (wemopus)"],
                                    ];
                                }
                                Detail.format = format;
                            })(Detail = Encode.Detail || (Encode.Detail = {}));
                            function forward() {
                                Sen.Script.Executor.push_as_module({
                                    id: "wwise.media.encode",
                                    configuration_file: Script.Home.query("~/Executor/Configuration/wwise.media.encode.json"),
                                    direct_forward(argument) {
                                        Executor.is_valid_source(argument, false);
                                        Script.Console.obtained(argument.source);
                                        Executor.defined_or_default(argument, "destination", `${Sen.Kernel.Path.except_extension(argument.source)}.wem`);
                                        Script.Console.output(argument.destination);
                                        Executor.load_bigint(argument, "format", this.configuration, Detail.format(), Sen.Kernel.Language.get("wwise.media.audio_format"));
                                        Executor.clock.start_safe();
                                        Sen.Script.Support.Wwise.Media.Encode.process_fs(argument.source, argument.destination, argument.format);
                                        Executor.clock.stop_safe();
                                        return;
                                    },
                                    batch_forward(argument) {
                                        return Executor.basic_batch(this, argument, false);
                                    },
                                    is_enabled: true,
                                    configuration: undefined,
                                    filter: ["file", /(.+)\.wav$/i],
                                    option: 76n,
                                });
                                return;
                            }
                            Encode.forward = forward;
                        })(Encode = Media.Encode || (Media.Encode = {}));
                    })(Media = WWise.Media || (WWise.Media = {}));
                })(WWise = Methods.WWise || (Methods.WWise = {}));
            })(Methods = Executor.Methods || (Executor.Methods = {}));
        })(Executor = Script.Executor || (Script.Executor = {}));
    })(Script = Sen.Script || (Sen.Script = {}));
})(Sen || (Sen = {}));
Sen.Script.Executor.Methods.WWise.Media.Encode.forward();
